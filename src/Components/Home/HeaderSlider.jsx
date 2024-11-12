import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function HeaderSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const slides = [
    {
      image: "/assets/images/banner/car1.jpg",
      text: "Discover Your Dream Car!",
      buttonText: "Explore Now",
      path:"/products"
    },
    {
      image: "/assets/images/banner/car4.jpg",
      text: "Luxury Meets Performance",
      buttonText: "View More",
       path:"/products"
    },
    {
      image: "/assets/images/banner/car3.jpg",
      text: "Unleash Your Driving Passion",
      buttonText: "SellNow",
       path:"/addCar"
    },
    {
      image: "/assets/images/banner/car4.jpg",
      text: "Experience the Road Like Never Before",
      buttonText: "Get Started",
       path:"/addCar"
    },
  ];

  return (
    <div className="slider-container bg-primary rounded-md">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img src={slide.image} alt={`Slide ${index + 1}`} className="h-64 w-full rounded-md" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-xl bg-black bg-opacity-50 rounded-md">
              <p>{slide.text}</p>
              <Link to={slide.path} className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition duration-300">
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeaderSlider;
