import React from 'react'
import Navbar from './component/navbar' 
import Card from './component/card'
const page = () => {
  return (
    <div>
        <div className='w-full flex flex-col md:flex-row pt-[64px] pb-[64px] px-[20px] md:px-[120px] gap-[24px] '>
          <div className='flex justify-between w-full items-start'>   
            <p className='text-[40px] md:text-[62px] font-semibold font-jakarta text-[#171718]'>
              Rafi Rahmanda
            </p>
          </div>
    
           <div className='flex justify-between items-end h-auto md:h-[77px] font-roboto-mono '>
              <p className="text-black text-[12px]md:text-[24px] w-auto md:w-[270px] md:pl-9 font-roboto-mono">UI/UX DESIGNER</p>
                <p className="text-black text-[12px]text-[24px] w-auto md:w-[270px] font-roboto-mono">PHNOM PENH, KH</p>
          </div>
        </div>
       <Card/>
    </div>
  )
}

export default page