import React,{useContext} from "react";
import { ShopContext } from "../context/ShopContext";
import {Link} from "react-router-dom"

const ProductItem = ({id,image,name,fullprice,halfprice})=>{
    const {currency} = useContext(ShopContext);


    return(
        <Link className='text-gray-700 cursor-pointer' to ={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out w-[300px] h-[200px] sm:h-[250px]' src = {image[0]}></img>
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{fullprice} | {currency}{halfprice}</p>
        </Link>
    )
}

export default ProductItem