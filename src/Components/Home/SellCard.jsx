import React from 'react'
import { Link } from 'react-router-dom'

const SellCard = () => {
  return (
   <>
   <div className='bg-primary  text-white p-20 flex justify-center items-center gap-10 my-20'>
    <div>
        <img src="/assets/images/banner/car1.jpg"
         className='w-[60%] rounded-xl'
         alt="" 
         />
    </div>
    <div className='gap-10'>
        <h1 className='text-xl font-semibold'>Are You want to Earn Here</h1>
        <p>
        Rent your car here! You just need to add your post about your car, and we will reach the expected users.
        Let us help you connect with potential renters and maximize your earnings!
        </p>
        <Link to='/addCar' className='text-lg bg-secondary rounded-full font-semibold px-10 py-4 mt-10'>Rent Now</Link>
    </div>
   </div>
   </>
  )
}

export default SellCard