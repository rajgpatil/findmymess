import React from 'react';
import Title from '../components/Title'
import {assets} from "../assets/assets"
import NewsletterBox from "../components/NewsletterBox"
const About = () =>{
    return(
        <div>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'ABOUT'} text2={'US'}/>
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img}></img>
                <div className='flex flex-col justify-center gap-6 md:w-2/4  text-gray-600'>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nesciunt natus necessitatibus reprehenderit vitae corrupti est voluptatem, veniam, optio fuga quo quis neque dolorem pariatur ullam recusandae commodi voluptates mollitia.</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, assumenda. Natus ut recusandae commodi. Repellendus, modi hic quaerat perspiciatis quis amet porro odio cumque ducimus, quos laudantium, cum maxime doloribus.</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, commodi? Id debitis, placeat iste dolorum esse blanditiis impedit mollitia consequuntur. Voluptate, explicabo unde quod consectetur optio animi exercitationem alias nihil!</p>
                </div>
            </div>
            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'}/>
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quaility Assurance:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, pariatur! Magnam earum hic veritatis ab accusantium adipisci, sequi excepturi eos impedit dolore maiores? Est velit quae soluta, fuga minima eveniet!</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, pariatur! Magnam earum hic veritatis ab accusantium adipisci, sequi excepturi eos impedit dolore maiores? Est velit quae soluta, fuga minima eveniet!</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, pariatur! Magnam earum hic veritatis ab accusantium adipisci, sequi excepturi eos impedit dolore maiores? Est velit quae soluta, fuga minima eveniet!</p>
                </div>
            </div>
            <NewsletterBox/>
        </div>
    )
}

export default About;