import React, { useState } from 'react';
import "./TreeComponent.css";

const TreeComponent = ({ node, renderHeader, renderChildren }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    const toggle = () => {
        if (hasChildren) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="tree-container">
            <div 
                className={`tree-header ${hasChildren ? 'has-children' : ''}`} 
                onClick={toggle}
            >
                {renderHeader(node.header)}
                {hasChildren && (
                    <span className={`arrow ${isOpen ? 'open' : 'closed'}`}>
                        {isOpen ? '▲' : '▼'}
                    </span>
                )}
            </div>

            {hasChildren && isOpen && (
                <div className="tree-body">
                    {renderChildren(node.children)}
                </div>
            )}
        </div>
    );
};

export default TreeComponent;