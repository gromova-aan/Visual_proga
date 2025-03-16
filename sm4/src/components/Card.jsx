import React from 'react';
import './Card.css'; 

const Card = (props) => {
    const { id, fullName, name, address, email } = props;

    return (
        <div className='card' key = {id}>
            <p><strong>Id:</strong> {id}</p>
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Name:</strong></p>
            <div style={{ marginLeft: '20px' }}>
                <p><strong>First Name:</strong> {name.firstName}</p>
                <p><strong>Last Name:</strong> {name.lastName}</p>
            </div>
            <p><strong>Address:</strong></p>
            <div style={{ marginLeft: '20px' }}>
                <p><strong>Line:</strong> {address.line1}</p>
                <p><strong>Town:</strong> {address.town}</p>
                <p><strong>County:</strong> {address.county}</p>
                <p><strong>Country:</strong> {address.country}</p>
            </div>
            <p><strong>Email:</strong> {email}</p>
        </div>
    );
};

export default Card;