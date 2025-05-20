import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
    return(
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'CONTACT'} text2={'US'}/>
            </div>
            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img className='w-full md:max-w-[480px]' src={assets.contact_img}></img>
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>Our Office</p>
                    <p className='text-gray-500'>416207 CBS Station <br></br> Plot 350, Kolhapur,Maharashtra</p>
                    <p className='text-gray-500'>Tal: (415) 555-0132 <br></br> Email: forever@gmail.com</p>
                    <p className='font-semibold text-xl text-gray-600'>Careers at findmymess</p>
                    <p className='text-gray-500'>Lear more about teams and job opening</p>
                    <button className='border bg-black text-white sm:bg-white sm:text-black border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
                </div>
            </div>
            <NewsletterBox/>
            
        </div>
    )
}

export default Contact;