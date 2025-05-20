import React,{useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Order = () => {

    const {backendUrl, token, currency} = useContext(ShopContext)

    const [orderData, setOrderData] = useState([])

    const loadOrderData = async()=>{
        try{
            if(!token){
                return null
            }

            const response = await axios.post(backendUrl + "/api/order/userorders",{},{headers:{token}})
            // console.log(response.data)
            if(response.data.success){
                let allOrdersItem = []
                response.data.orders.map((order)=>{
                    order.items.map((item)=>{
                        //in our perticular item add the status,payment,paymentMethod,date
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                // console.log(allOrdersItem)
                setOrderData(allOrdersItem.reverse())//use reverse for latest orders are seen on the top
                // console.log(allOrdersItem)
            }
        }
        catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }

    useEffect(()=>{
        loadOrderData()
    },[token])

    return(
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'}/>
            </div>
            <div>
                {
                    orderData.map((item,index)=>(
                        <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='flex items-start gap-6 text-sm'>
                                <img className='w-16 sm:w-20' src={item.image[0]}></img>
                                <div>
                                    <p className='sm:text-base font-medium'>{item.name}</p>
                                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                        <p className='text-lg'>{currency}{item.size === "Full" ? item.fullprice : item.halfprice}</p>
                                        <p>Quantity:item.quantity</p>
                                        <p>Size: {item.size}</p>
                                    </div>
                                    <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                                    <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod === 'COD' ? "Cash On Delevary" : item.paymentMethod}</span></p>
                                </div>
                            </div>
                            <div className='md:w-1/2 flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                    {/* In Tailwind CSS, text-base is a utility class used to set the font size of an element to the default base font size, which is usually 16px. */}
                                    <p className='text-sm md:text-base'>{item.status}</p>
                                </div>
                                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                            </div>
                            
                        </div>

                    ))
                }
            </div>
        </div>
    )
}
export default Order