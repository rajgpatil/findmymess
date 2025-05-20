import { createContext, useEffect, useState } from "react"
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
export const ShopContext = createContext();

import axios from 'axios'


const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 10;
    // for search bar text
    const [search, setSearch] = useState('')
    //for show the pop-up search bar
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    // for the procced to checkout option in cart items
    const navigate = useNavigate();
    //backend url
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [products, setProducts] = useState([])
    const [token,setToken] = useState('')


    // for add to cart the product for add to cart button on product page
    const addToCart = async (itemId, size) => {
        // This code defines a React state cartItems and a function addToCart that updates the cart when an item is added. Here’s a breakdown of each line:

        // Breakdown of useState
        // const [cartItems, setCartItems] = useState({}):
        // cartItems is a state variable that starts as an empty object {}.
        // This object will keep track of items in the cart, where each item has a unique ID and possibly multiple sizes.
        // The addToCart Function
        // This function, addToCart, takes two arguments:

        // itemId: the unique identifier of the item.
        // size: the size of the item being added (e.g., "small", "medium", "large").
        // Step-by-Step Dry Run
        // Clone the Current Cart:

        // let cartData = structuredClone(cartItems);
        // Makes a deep copy of the current cartItems state to avoid directly modifying state (a React best practice).
        // Check if Item Exists in Cart:

        // if (cartData[itemId]):
        // This checks if the item with itemId is already in the cart.
        // If it exists, it goes into a nested check. Otherwise, it creates a new entry.
        // If Item Exists:

        // if (cartData[itemId][size]):
        // If the specific size of that item already exists, it increases the count by 1: cartData[itemId][size] += 1;.
        // Otherwise, it creates a new size entry for that item and sets it to 1: cartData[itemId][size] = 1;.
        // If Item Doesn’t Exist:

        // else { cartData[itemId] = {}; cartData[itemId][size] = 1; }
        // If the item is not already in the cart, it creates a new object for the item with cartData[itemId] = {}, then sets the size to 1.
        // Update the State:

        // setCartItems(cartData);
        // Finally, it updates the cartItems state with the modified cartData, which now has the updated count for the item and size.
        // Example
        // Starting State
        // javascript
        // Copy code
        // cartItems = {}
        // Call addToCart('item1', 'M')
        // item1 with size M isn’t in the cart, so we add it.
        // javascript
        // Copy code
        // cartItems = { item1: { M: 1 } }
        // Call addToCart('item1', 'M') Again
        // item1 with size M exists, so we increment its quantity.
        // javascript
        // Copy code
        // cartItems = { item1: { M: 2 } }
        // Call addToCart('item1', 'L')
        // item1 exists, but size L doesn’t, so we add it with a quantity of 1.
        // javascript
        // Copy code
        // cartItems = { item1: { M: 2, L: 1 } }
        // This way, addToCart keeps track of each item and size separately and updates quantities accordingly.

        // cartItems = {
        //     aaa1(Product_id):{M:1,L:1}(Product_sizes),
        //     aaa2:{S:1,M:1}
        // }

        if (!size) {
            toast.error('Select Product Size')
            return
        }

        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        if(token){
            try{
                const response = await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
                if(response.data.success){
                    toast.success(response.data.message)
                }
                else{
                    toast.error(response.data.message)
                    localStorage.removeItem('token')
                }
            }
            catch(err){
                console.log(err)
                toast.error(err.message)

            }
        }
    }

    //     When you call addToCart, it modifies the cartItems state by calling setCartItems(cartData).
    // This update to cartItems triggers a re-render of any components that use cartItems or functions related to it, like getCartCount.
    // Since getCartCount relies on the cartItems state, every time cartItems changes, React will re-render Navbar.jsx, where getCartCount() is called inside the <p> tag.

    // for get the cart count on the navbar cart option
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                }
                catch (error) {
                    console.log(err)
                    toast.error(err.message)
                }
            }
        }
        return totalCount;
    }

    // useEffect(()=>{
    //     console.log(cartItems)
    // },[cartItems])

    //clear or update the cart items
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        // update the quantity
        cartData[itemId][size] = quantity
        setCartItems(cartData)
        if(token){
            try{
                await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity},{headers:{token}})
            }
            catch(err){
                console.log(err)
                toast.error(err.message)
            }
        }
    }

      // get the all user cards
      const getUserCart = async (token)=>{
        try{
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
                toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)
                setToken('')
                localStorage.removeItem('token')
            }
        }
        catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }

    // for get the total price of all the cart products
    const getCartAmount = () => {
        let totalAmount = 0
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items)
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        if(item === "Full"){
                            totalAmount += itemInfo.fullprice * cartItems[items][item]
                            // console.log(item)   
                        }
                        else if(item === "Half"){
                            totalAmount += itemInfo.halfprice * cartItems[items][item]
                            // console.log(item)   
                        }
                                 
                    }
                }
                catch(error){

                }
            }
        }

        return totalAmount
    }

    const getProductsData = async()=>{
        try{
            const response = await axios.get(backendUrl + '/api/product/list')
            // console.log(response)
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        }
        catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }

    useEffect(()=>{
        getProductsData()
        getCartCount()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[]) 

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl, token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;