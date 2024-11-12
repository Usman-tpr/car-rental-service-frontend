import React, { useState } from 'react';
import { MdFavorite } from 'react-icons/md'; // Importing the heart icon
import { useNavigate } from 'react-router-dom';

const Card = ({ condition, price, color, model, brand , image , id }) => {
    const [ opacity , setOpacity ] = useState("opacity-100")
    const navigate = useNavigate()
    const handleOpacity = () =>{
       setOpacity("opacity-30")
    }
    const removeOpacity = () =>{
       setOpacity("opacity-100")
    }
    const addedToFavourite = () =>{

    }
    const handleNavigate =  () =>{
         navigate(`/productDetails/${id}`)
    }
    return (
        <div className='border-2 border-secondary rounded-md relative group' 
         onMouseEnter={handleOpacity}
         onMouseLeave={removeOpacity}
         onClick={handleNavigate}
         >
            <div className={`relative`}>
                <img
                    src={`http://localhost:5000/${image[0]}` || "/asssets/images/banner/car4.jpg"}
                    className={`w-72 rounded-t-md ${opacity}`}
                    alt="Car"
                />
                {/* Heart Icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MdFavorite className='text-black text-3xl ' onClick={addedToFavourite}/>
                </div>

            </div>
            <div className={`${opacity}`}>
                <h1 className='text-md px-2 text-primary mt-5'>Condition: {condition || "New"}</h1>
                <h1 className='text-md px-2 text-primary'>Price: {price}/Day</h1>
                <h1 className='text-md px-2 text-primary'>Model: {model }</h1>
                <h1 className='text-md px-2 text-primary'>Brand: {brand }</h1>
            </div>
        </div>
    );
};

export default Card;
