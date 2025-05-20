import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem"

const RelatedProducts = ({category})=>{
    const {products} = useContext(ShopContext)
    const [related,setRelated] = useState([])

    useEffect(()=>{
        if(products.length > 0){
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter(item=>category === item.category)

            setRelated(productsCopy.slice(0,5))
        }
    },[products])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    return(
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>
            <div onClick={scrollToTop} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} fullprice={item.fullprice} halfprice={item.halfprice} image={item.image}/>
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts