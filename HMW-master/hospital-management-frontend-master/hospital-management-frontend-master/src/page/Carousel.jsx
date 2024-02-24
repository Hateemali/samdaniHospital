import React, { useState, useEffect } from "react";
import carousel1 from "../images/1.png";
import carousel2 from "../images/2.png";
import carousel3 from "../images/3.jpg";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [carousel1, carousel2, carousel3];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="false"
      style={{ height: "100vh" }}
    >
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            type="button"
            key={index}
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === activeIndex ? "active" : ""}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner" style={{ height: "100%" }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item${index === activeIndex ? " active" : ""}`}
            style={{ height: "100%" }}
          >
            <img
              src={image}
              className="d-block w-100"
              alt={`Slide ${index + 1}`}
              style={{ height: "90%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
        onClick={() =>
          setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
          )
        }
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
        onClick={() =>
          setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
        }
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
