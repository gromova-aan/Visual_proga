import React from 'react'
import './Card.css'

const Card = (props) => {
    const {userId, id, title} = props;

    return (
        <div className='card' key = {id}>
            <p><strong>User ID:</strong> {userId}</p>
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Title:</strong> {title}</p>
        </div>
    );
}

export default Card;