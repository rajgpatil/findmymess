import React,{useContext, useState,useEffect} from 'react'
import {ShopContext} from "../context/ShopContext"
import { assets } from '../assets/assets'
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

const Collection = () => {

    const {products,search,showSearch} = useContext(ShopContext)
    //for on/off filter option on small scrren sizes
    const [showFilter,setShowFilter] = useState(false)
    //for map the products 
    const [filterProducts,setFilterProducts] = useState([])
    //for category option
    const [category,setCategory] = useState([])
    //for sub category option
    const [subCategory,setSubCategory] = useState([])
    //for sorting products on price
    const [sortType,setSortType] = useState('relevant')

    //for toggle in specific product category
    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setCategory(prev => [...prev,e.target.value])
        }
    }

    // for apply specific filter on product
    const applyFilter = () => {
        let productsCopy = products.slice();

        if(showSearch && search){
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if(category.length>0){
            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }
        if(subCategory.length>0){
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProducts(productsCopy)
    }
    // for the filterProducts array is empty it's at the first time page loaded
    // useEffect(()=>{
    //     setFilterProducts(products)
    // },[])

    const sortProduct = () =>{
        let fpCopy = filterProducts.slice()
        switch(sortType){
            case 'low-high':
                setFilterProducts(fpCopy.sort((a,b)=>(a.fullprice-b.fullprice)))
                break

            case 'high-low':
                setFilterProducts(fpCopy.sort((a,b)=>(b.fullprice - a.fullprice)))
                break

            default:
                applyFilter()
                break
        }
    }

    //for if the category and subcategory states are updated then this useeffect was run
    useEffect(()=>{
        applyFilter();
    },[category,subCategory,search,showSearch,products])

    useEffect(()=>{
        sortProduct()
    },[sortType,products])

    return(
        <div className='flex flex-col sm:flex-row gap1 sm:gap-10 pt-10 border-t'>
            {/* Filter options */}
            <div className='min-w-60'>
                <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`} src={assets.dropdown_icon}></img>
                </p>
               
                {/* Category Filter */}
                {/* in this code the sm:block so the showFilter is flase then the hidden class is add for only small screen sizes because the sm:block means for greater than small screen sizes the display is block */}
                <div className={`border border-grey-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-grey-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Veg'} onChange={toggleCategory}></input>Veg
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Non-Veg'} onChange={toggleCategory}></input>Non-Veg
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'DISHES'}/>
                    {/* Product sort */}
                    <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Map Products */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterProducts.map((item,index)=>(
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} fullprice={item.fullprice} halfprice={item.halfprice}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection;