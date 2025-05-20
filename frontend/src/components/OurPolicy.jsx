import React from "react"
import { assets } from "../assets/assets"
const OurPolicy = ()=>{
    return(
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
              <div>
                <img src={assets.exchange_icon} className="w-12 m-auto mb-5"></img>
                <p className="font-semibold">Easy Return Policy</p>
                <p className="text-grey-400">We offer return option at the time of delivery</p>
            </div>
            <div>
                <img src={assets.quality_icon} className="w-12 m-auto mb-5"></img>
                <p className="font-semibold">All Dishes Verified by FindMyMess</p>
                <p className="text-grey-400">All Dishes are fresh or home made</p>
            </div>
            <div>
                <img src={assets.support_img} className="w-12 m-auto mb-5"></img>
                <p className="font-semibold">Best Customer Support</p>
                <p className="text-grey-400">We Provide 24/7 Customer Support</p>
            </div>
        </div>
    )
}

export default OurPolicy