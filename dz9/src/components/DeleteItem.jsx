import React from "react";
import '../assets/DeleteItem.css'

const DeleteItem = ({onDeleteItem}) => {
    return (
        <button onClick={onDeleteItem} className="delete-button">
            Удалить выделенные строки
        </button>
    );
};

export default DeleteItem;