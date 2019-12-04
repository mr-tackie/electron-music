import React from 'react';
import './button.css'

const Button = ({children, onClick}) => {
    return (
        <span className="button" onClick={onClick}>
            {children}
        </span>
    )
}

export default Button;