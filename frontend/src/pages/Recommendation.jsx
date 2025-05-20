import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ShopContext } from '../context/ShopContext'
import ProductItem from "../components/ProductItem"
import Title from "../components/Title"

const Recommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const {token,backendUrl} = useContext(ShopContext)
    const fetchRecommendations = async () => {
        try {
            const response = await axios.post(backendUrl + "/api/ai/get-recommendations",{},{ headers: { token } });
            setRecommendations(response.data.recommendations || []);
            
        } catch (error) {
            console.error("Error fetching recommendations", error);
        }
    };

    useEffect(()=>{
        if(token){
            fetchRecommendations()
        }
        
    },[token])


    return (
        <div>
            <Title text1={'RECOMMENDED DISHES '} text2={'FOR YOU'}/>
            {recommendations && recommendations.length === 0 ? (
                <p>No recommendations available....</p>
            ) : (

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                recommendations.map((dish, index) => (
                     <ProductItem key = {index} id ={dish._id} image = {dish.image} name={dish.name} fullprice={dish.fullprice} halfprice={dish.halfprice}/>
                ))
            }
            </div>
            )}
        </div>
    );
};

export default Recommendation;
