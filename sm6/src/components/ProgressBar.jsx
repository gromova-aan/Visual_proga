import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ title, percentage, onCancel }) => {
    return (
        <div className="progress-bar-container">
            <h3 className="progress-bar-title">{title}</h3>
            {percentage !== null ? (
                <div className="progress-bar-wrapper">
                    <div className="progress-bar">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${percentage}%` }}
                        >
                            <span className="progress-percentage">{percentage}%</span>
                        </div>
                    </div>
                    <button className="cancel-button" onClick={onCancel}>
                        X
                    </button>
                </div>
            ) : (
                <div className="canceled-message">Canceled</div>
            )}
        </div>
    );
};

export default ProgressBar;