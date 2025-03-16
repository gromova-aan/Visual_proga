import React from 'react';

const BookCard = ({title, authors, cover}) => {
    return (
        <div className="book-card">
            <img src ={cover} alt = {title} className="book-cover" />
            <h2 className="book-tatle">{title}</h2>
            <p className="book-authors">{authors ? authors.join(', ') : 'Автор не указан'}</p>
        </div>
    );
};

export default BookCard;