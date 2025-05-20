import React,{useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext"
import Title from "./Title";
import ProductItem from "./ProductItem"

const LatestCollection = ()=>{
    const {products} = useContext(ShopContext)
    // console.log(products)
    const [latestProducts,setLatestProducts] = useState([]);
    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return(
       
        <div className='my-10'>
            <div className="text-center py-8 text-2xl sm:text-3xl">
                <Title text1={'TODAYS'} text2={'DISHES'}/>
                <p className="w=3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis asperiores recusandae 
                </p>
            </div>
            
            {/* Rendering Products */}
            <div onClick={scrollToTop} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item,index)=>(
                            <ProductItem key = {index} id ={item._id} image = {item.image} name={item.name} fullprice={item.fullprice} halfprice={item.halfprice}/>
                    ))
                }
            </div>
        </div>
    )
}
export default LatestCollection;