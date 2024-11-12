import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderSidebar from '../Components/Home/HeaderSidebar';
import HeaderSlider from '../Components/Home/HeaderSlider';
import Categories from '../Components/Home/Categories';
import Card from '../Components/Home/Card';
import SellCard from '../Components/Home/SellCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const [cars, setCars] = useState([]);
    const [newModel , setNewModel ] = useState([])
    const [honda , setHonda ] = useState([])
    const [lessPrice , setLessPrice] = useState([])
    const [highPrice , setHighPrice] = useState([])

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cars/get-cars');
                setCars(response.data.data); // Store all cars
                setNewModel(response.data.data.filter(car => car.condition=="new"))
                setHonda(response.data.data.filter(car => car.brand == "Honda"))
                setLessPrice(response.data.data.filter(car => car.price <10000 ))
                setHighPrice(response.data.data.filter(car => car.price > 20000))

            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };
        fetchCars();
    }, []);



    return (
        <>
            <header className='mx-20 flex justify-between my-10'>
                <div className='w-1/4'>
                    <HeaderSidebar  />
                </div>
                <div className='w-[60%]'>
                    <HeaderSlider />
                    <Categories />
                </div>
            </header>

            <div className='mx-20'>
                <h1 className='text-xl font-medium text-primary'>Trending Now</h1>
                <h1 className='text-xl font-medium text-primary text-end me-32 -mt-3'><Link to='/products'>See All</Link></h1>
                
                <div className='flex gap-10 flex-wrap my-5'>
                    {cars.slice(-4).map((car, index) => (
                        <Card
                            key={index}
                            id={car._id}
                            condition={car.condition}
                            price={car.price}
                            color={car.color}
                            model={car.model}
                            brand={car.brand}
                            image={car.images}
                        />
                    ))}
                </div>
            </div>

            <div className='mx-20 mt-5'>
                <h1 className='text-xl font-medium text-primary'>New Model Cars</h1>
                <h1 className='text-xl font-medium text-primary text-end me-32 -mt-3'><Link to='/products'>See All</Link></h1>
                
                <div className='flex gap-10 flex-wrap my-5'>
                    {newModel.slice(-4).map((car, index) => (
                        <Card
                            key={index}
                            id={car._id}
                            condition={car.condition}
                            price={car.price}
                            color={car.color}
                            model={car.model}
                            brand={car.brand}
                            image={car.images}
                        />
                    ))}
                </div>
            </div>

            <div className='mx-20 mt-5'>
                <h1 className='text-xl font-medium text-primary'>Honda Cars</h1>
                <h1 className='text-xl font-medium text-primary text-end me-32 -mt-3'><Link to='/products'>See All</Link></h1>
                
                <div className='flex gap-10 flex-wrap my-5'>
                    {honda.slice(-4).map((car, index) => (
                        <Card
                            key={index}
                            id={car._id}
                            condition={car.condition}
                            price={car.price}
                            color={car.color}
                            model={car.model}
                            brand={car.brand}
                            image={car.images}
                        />
                    ))}
                </div>
            </div>

            <div className='mx-20 mt-5'>
                <h1 className='text-xl font-medium text-primary'>Low Price Cars</h1>
                <h1 className='text-xl font-medium text-primary text-end me-32 -mt-3'><Link to='/products'>See All</Link></h1>
                
                <div className='flex gap-10 flex-wrap my-5'>
                    {lessPrice.slice(-4).map((car, index) => (
                        <Card
                            key={index}
                            id={car._id}
                            condition={car.condition}
                            price={car.price}
                            color={car.color}
                            model={car.model}
                            brand={car.brand}
                            image={car.images}
                        />
                    ))}
                </div>
            </div>

            <div className='mx-20 mt-5'>
                <h1 className='text-xl font-medium text-primary'>High Price Cars</h1>
                <h1 className='text-xl font-medium text-primary text-end me-32 -mt-3'><Link to='/products'>See All</Link></h1>
                
                <div className='flex gap-10 flex-wrap my-5'>
                    {highPrice.slice(-4).map((car, index) => (
                        <Card
                            key={index}
                            id={car._id}
                            condition={car.condition}
                            price={car.price}
                            color={car.color}
                            model={car.model}
                            brand={car.brand}
                            image={car.images}
                        />
                    ))}
                </div>
            </div>

            <SellCard />
        </>
    );
};

export default Home;
