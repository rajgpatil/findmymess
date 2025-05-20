import React, { useState, useEffect, useContext } from 'react'
import Title from "./Title"
import ProductItem from './ProductItem'
import { ShopContext } from '../context/ShopContext'

import axios from 'axios';

const BestSeller = () => {
    const { backendUrl } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([]);

    const fetchDishes = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/ai/get-popular-dishes");
            setBestSeller(response.data.popular_dishes || []);
        } catch (error) {
            console.error("Error fetching popular dishes", error);
        }
    };


    useEffect(() => {
        fetchDishes();
       
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // console.log(bestSeller)

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'POPULAR'} text2={'DISHES'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum inventore, commodi
                </p>
            </div>
            {bestSeller && bestSeller.length === 0 ? (
                <p>No Popular Dishes Aavailable....</p>
            ) : (
            <div onClick={scrollToTop} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} fullprice={item.fullprice} halfprice={item.halfprice} />
                    ))
                }
            </div>
            )}
        </div>
    )
}
export default BestSeller