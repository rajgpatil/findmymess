import React, { useContext, useState, useEffect } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
const Navbar = () => {
    // variable visible for controll the small size menu div 
    //display menu in sm screen sizes
    const [visible, setVisible] = useState(false);
    // show the search pop-up option
    const {showSearch,setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext)
    //for show the search icon only on collection page
    const [searchIcon,setSearchIcon] = useState(false)
    const location = useLocation()
    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setSearchIcon(true)
        }
        else{
            setSearchIcon(false)
        }
    },[location])

    const logout = () =>{
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        
    }
    // go to admin portal
    const admin = ()=>{
        window.location.href = 'http://localhost:5174/';
    }
    return(
        <div className='flex items-center justify-between py-5 font-medium'>
            {/* assets is the js file in the assets folder in that we import all the images and store in object assets  */}
            {/* logo */}
            <Link to = '/'>
                <img src={assets.logo} className='w-36' alt='logo'></img>
            </Link>
            {/* Menu */}
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                {/* navlink for redirect into the pages of the project */}
                {/* we use flex-col for in navbar the our page name is above and the underline is the below the name for this we set the flex col is set the flex in vertical order */}
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border border-orange-500 h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border border-orange-500 h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border border-orange-500 h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border border-orange-500 h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/recommendation' className='flex flex-col items-center gap1'>
                    <p>RECOMMENDED</p>
                    <hr className='w-2/4 border border-orange-500 h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
            </ul>
            {/* profil section */}
            <div className='flex items-center gap-6'>
                    {/* search */}
                    {
                        searchIcon ? <img onClick={()=>setShowSearch(!showSearch)} src={assets.search_icon} className='w-5 cursor-pointer' alt=""></img> : null
                    }
                    <div className='group relative'>
                        {/* profil */}
                        <img onClick={()=> token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon}></img>
                        {/* DropDown Menu */}
                        {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={admin} className='cursor-pointer hover:text-black'>Admin</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>}
                    </div>
                    {/* cards */}
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className='w-5 min-w-5'></img>
                        {/* aspect-square is used to ensure that an element maintains a 1:1 aspect ratio, meaning the height and width are always equal */}
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </Link>
                    <img onClick={()=>setVisible(true)} src = {assets.menu_icon} className='w-5 cursor-pointer sm:hidden'></img>
                </div>
                {/* Sidebar menu for small screens */}
                <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                    <div className = 'flex flex-col text-gray-600'>
                        <div onClick={()=>setVisible(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
                            <img className='h-4 rotate-180 mt-1' src={assets.dropdown_icon}></img>
                            <p>Back</p>
                        </div>
                        <NavLink onClick = {()=>setVisible(false)} className = 'py-2 pl-6 border' to = '/'>HOME</NavLink>
                        <NavLink onClick = {()=>setVisible(false)} className = 'py-2 pl-6 border' to = '/collection'>COLLECTIONS</NavLink>
                        <NavLink onClick = {()=>setVisible(false)} className = 'py-2 pl-6 border' to = '/about'>ABOUT</NavLink>
                        <NavLink onClick = {()=>setVisible(false)} className = 'py-2 pl-6 border' to = '/contact'>CONTACT</NavLink>
                    </div>
                </div>
        </div>
    )
}

export default Navbar