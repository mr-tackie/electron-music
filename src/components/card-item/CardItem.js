import React from 'react';
import './CardItem.css';

const CardItem = ({ title, subtitle, muted, image, children, className }) => {
    return (
        <div className={`card-item ${className}`}>
            <div className="card-image">
                <img src={image} alt={title}/>
                <div className="card-overlay">
                </div>
                {children}
            </div>
            <div className = "card-meta">
                <div className = "meta-main">
                    <h3>{title}</h3>
                    <h4>{subtitle}</h4>
                </div>
                <span>{muted}</span>
            </div>
        </div>
    )
}

export default CardItem;