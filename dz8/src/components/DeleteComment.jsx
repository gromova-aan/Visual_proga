import React from "react";
import '../assets/DeleteComment.css'

const DeleteComment = ({onDeleteComment}) => {
    return (
        <button onClick={onDeleteComment} className="delete-button">
            Удалить выделенные строки
        </button>
    );
};

export default DeleteComment;