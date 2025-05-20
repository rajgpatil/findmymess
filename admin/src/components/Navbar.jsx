import React from 'react'
import {assets} from "../assets/assets.js"
const Navbar = ({setToken}) =>{

    //go to user home page
    const user_homepage = ()=>{
        window.location.href = 'http://localhost:5173/';
    }
    return(
        
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <img onClick={user_homepage} className='w-[max(13%,120px)] sm:w-[max(13%,100px)] cursor-pointer' src={assets.logo} alt=""/>
            <button onClick={()=>setToken('')} className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}

export default Navbar