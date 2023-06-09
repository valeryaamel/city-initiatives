import React, { useState } from "react";
import './styles/slider.css';
const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const prevImage = () => {
        const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
    };

    const nextImage = () => {
        const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
    };

    return (
        <div className="slider">
            <div className="slider-images">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`slider-image ${index === currentImageIndex ? "active" : ""}`}
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                ))}
            </div>
            {
                images.length > 1 ?
                    <div className="slider-controls">
                        <button onClick={prevImage}>Предыдущая</button>
                        <button onClick={nextImage}>Следущая</button>
                    </div>
                    :
                    <br/>
            }

        </div>
    );
};

export default ImageSlider;
