//
import React, { useState, useEffect } from "react";
import Hero1 from "../assets/images/Hero1.png";
import Hero2 from "../assets/images/Hero2.png";
import Hero3 from "../assets/images/Hero3.png";

function Home() {
  const slides = [
    {
      image: Hero1,
      subtitle: "Step Into Style",
      title: "KICKHOUSE",
      description: "Discover your next favorite pair of sneakers.",
      button: "Shop Collection",
    },
    {
      image: Hero2,
      subtitle: "Fresh Arrivals",
      title: "NEW DROPS",
      description: "Explore the latest sneaker trends and styles.",
      button: "Explore Now",
    },
    {
      image: Hero3,
      subtitle: "Made For Comfort",
      title: "WALK BOLD",
      description: "Find the perfect pair for every occasion.",
      button: "Discover More",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
  }, [slides.length]);
  return (
    <div
      id="home"
      className="min-h-[95vh] relative   flex items-center px-8 md:px-16 sm:px-8 md:px-16" 
    >
      <img
        key={currentSlide}
        src={slides[currentSlide].image}
        alt="Featured Sneaker"
        className="absolute inset-0 w-full h-full object-cover object-center animate-fade"
      />
      <div className="relative z-10 w-full">
        {/* Left Content */}
        <div className="text-left">
          <p className="text-accent font-semibold tracking-[0.3em] uppercase text-sm mb-5">
            {slides[currentSlide].subtitle}
          </p>

          <h1 className="text-primary text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            {slides[currentSlide].title}
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-md leading-relaxed mb-8">
            {slides[currentSlide].description}
          </p>

          <button className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-primary transition duration-300">
            Shop Collection
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
