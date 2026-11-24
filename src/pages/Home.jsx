//
import { useState, useEffect } from "react";
import Hero1 from "../assets/images/Hero1.png";
import Hero2 from "../assets/images/Hero2.png";
import Hero3 from "../assets/images/Hero3.png";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = decodeURIComponent(location.hash.slice(1));

    const timer = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", "/");
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-6 sm:px-10 md:px-16"
    >
      <img
        key={currentSlide}
        src={slides[currentSlide].image}
        alt="Featured sneaker in the KICKHOUSE collection"
        className="absolute inset-0 h-full w-full object-cover object-center animate-fade"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-xl text-left">
          <p className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.24em] text-primary">
            <span className="h-1 w-8 rounded-full bg-accent" aria-hidden="true" />
            {slides[currentSlide].subtitle}
          </p>

          <h1 className="mb-6 text-5xl font-black tracking-[-0.05em] text-primary sm:text-6xl md:text-7xl">
            {slides[currentSlide].title}
          </h1>

          <p className="mb-8 max-w-md text-base leading-relaxed text-primary/75 md:text-lg">
            {slides[currentSlide].description}
          </p>

          <Link
            to="/#featredkicks"
            className="inline-flex items-center rounded-full bg-primary px-7 py-3 font-semibold text-background transition duration-200 hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {slides[currentSlide].button}
            <span className="ml-3 text-lg" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
