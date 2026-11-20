
import { useRef } from "react";

function useCarousel() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const maxScroll =
      carousel.scrollWidth - carousel.clientWidth;

    if (direction === "right") {
      if (carousel.scrollLeft >= maxScroll - 5) {
        carousel.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        carousel.scrollBy({
          left: 340,
          behavior: "smooth",
        });
      }
    } else {
      if (carousel.scrollLeft <= 5) {
        carousel.scrollTo({
          left: maxScroll,
          behavior: "smooth",
        });
      } else {
        carousel.scrollBy({
          left: -340,
          behavior: "smooth",
        });
      }
    }
  };

  return { carouselRef, scroll };
}

export default useCarousel;
