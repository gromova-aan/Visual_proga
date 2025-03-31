import React, { useState } from 'react';
import "../components/Fruits.css";

const Fruits = ({header, children, renderHeader}) => {
    const [isOpen, setIsOpen] = useState(false); //компонент изначально закрыт

    const toggle = () => {
        setIsOpen(!isOpen); //переключает состояние компонента 
    };

    return (
        <div className="fruits-container">
            <div className="fruits-header" onClick={toggle}>
                {renderHeader(header)}
                <span className={`arrow ${isOpen ? 'open' : 'closed'}`}>
                    {isOpen ? '▲' : '▼'}
                </span>
            </div>

            <div
                className={`fruits-body ${isOpen ? 'open' : 'closed'}`}
                style={{ height: isOpen ? 'auto' : '0' }}>
                {children}
            </div>
        </div>
    );
};

export default Fruits;