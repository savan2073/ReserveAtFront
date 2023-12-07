import React from "react";
import {useState} from "react";
import '../styles/Carousel.css';




const Carousel = ({items}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        if (currentIndex < items.length - 4) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <div className="carousel-container">
            {currentIndex > 0 && (
                <button className="carousel-button left" onClick={goToPrevious}>
                    {"<"}
                </button>
            )}

            <div className="carousel-items">
                {items.slice(currentIndex, currentIndex + 4).map((item, index) => (
                    <div key={index} className="carousel-item">
                        {item}
                    </div>
                ))}
            </div>

            {currentIndex < items.length - 4 && (
                <button className="carousel-button right" onClick={goToNext}>
                    {">"}
                </button>
            )}
        </div>
    );

}



export default Carousel;