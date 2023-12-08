import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Carousel.css'; // Załóżmy, że tutaj są twoje style CSS

const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = React.Children.count(children);
    const itemsPerView = 4; // Ilość elementów widocznych na raz

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < totalItems - itemsPerView ? prevIndex + 1 : prevIndex));
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    return (
        <div className="carousel-container" style={{ '--current-index': currentIndex }}>
            {currentIndex > 0 && (
                <button className="carousel-button left" onClick={goToPrevious}>
                    {"<"}
                </button>
            )}
            <div className="carousel-items" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView + (10 * 2))}%)` }}>                {React.Children.map(children, (child, index) => (
                    <div key={index} className="carousel-item" style={{ width: `calc(100% / ${itemsPerView})` }}>
                        {child}
                    </div>
                ))}
            </div>
            {currentIndex < totalItems - itemsPerView && (
                <button className="carousel-button right" onClick={goToNext}>
                    {">"}
                </button>
            )}
        </div>
    );
};

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Carousel;
