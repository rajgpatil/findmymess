import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from "axios"
import { backendUrl } from "../App"
import { toast } from 'react-toastify'

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Veg")
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])

    const [fullPrice, setFullPrice] = useState("")
    const [halfPrice, setHalfPrice] = useState("")


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            //add this form data at the api call 
            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("category", category)
            formData.append("bestseller", bestseller)
            // out sizes is in the form of array, we can not send array in formdata so we can convert it in String
            formData.append("sizes", JSON.stringify(sizes))
            formData.append("fullprice", fullPrice)
            formData.append("halfprice", halfPrice)

            console.log(fullPrice + 2)

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value);
            // }

            // send this formdata to our api 
            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

            // console.log(response)

            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setFullPrice("")
                setHalfPrice("")
                setBestseller(false)
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.message)
            localStorage.removeItem('token')
        }


    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 justify-center'>
            <div>
                <p className='mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    <label httmlfor="image1">
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden></input>
                    </label>
                    <label httmlfor="image2">
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden></input>
                    </label>
                    <label httmlfor="image3">
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden></input>
                    </label>
                    <label httmlfor="image4">
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden></input>
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here' required ></input>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Write content here' required ></textarea>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    {/* <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'> */}
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>

                    </select>

                </div>
                <div className='flex flex-col sm:flex-row sm:gap-6'>
                    <div className='flex flex-col'>
                        <p className='mb-2'>Full Product Price</p>
                        <input onChange={(e) => setFullPrice(e.target.value)} value={fullPrice} className='px-3 py-2 sm:w-[120px]' type='Number' placeholder='200'></input>
                    </div>
                    <div className='flex flex-col'>
                        <p className='mb-2'>Half Product Price</p>
                        <input onChange={(e) => setHalfPrice(e.target.value)} value={halfPrice} className='px-3 py-2 sm:w-[120px]' type='Number' placeholder='100'></input>
                    </div>
                </div>
            </div>

            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                    <div onClick={() => setSizes(prev => prev.includes("Full") ? prev.filter(item => item !== "Full") : [...prev, "Full"])}>
                        <p className={`${sizes.includes("Full") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Full</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("Half") ? prev.filter(item => item !== "Half") : [...prev, "Half"])}>
                        <p className={`${sizes.includes("Half") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Half</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type='checkbox' id='bestseller'></input>
                <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
            </div>

            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>Add</button>
        </form>
    )
}

export default Add