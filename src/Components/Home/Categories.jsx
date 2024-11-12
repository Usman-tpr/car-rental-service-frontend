import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
  const cars = [
    {"imagePath" : "/assets/images/banner/car1.jpg" , "title" : "Honda"},
    {"imagePath" : "/assets/images/banner/car2.jpg" , "title" : "Suzuki"},
    {"imagePath" : "/assets/images/banner/car3.jpg" , "title" : "Toyota"},
    {"imagePath" : "/assets/images/banner/car1.jpg" , "title" : "Sazgar"},
    {"imagePath" : "/assets/images/banner/car1.jpg" , "title" : "BMW"},
    {"imagePath" : "/assets/images/banner/car1.jpg" , "title" : "Hyundai"},
  ]
    return (
        <>
            <h1 className='text-primary text-xl font-medium mt-12'>Most Rented Brands</h1>

            <div className="flex flex-wrap gap-10  mt-10">
              {
                cars.map((e) =>(
                    <>
                      <div className='flex flex-col items-center'>
                     <div className='w-24 h-24 flex items-center justify-center rounded-full bg-secondary text-white'>
                     <Link to='/products' className='text-lg'>{e.title}</Link>
                     </div>
                </div>
                    </>
                ))
              }
            </div>
        </>
    )
}

export default Categories