import React, { useState } from 'react';
import './Dropdown.css';
import img from '../assets/Display.svg';

function DropdownMenu({ grouping, setGrouping, sorting, setSorting }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleGroupingChange = (e) => {
        setGrouping(e.target.value);
        setIsOpen(false); 
    };

    const handleSortingChange = (e) => {
        setSorting(e.target.value);
        setIsOpen(false); 
    };

    return (
        <div className="dropdown">
            
            <button className="dropdown-button" onClick={toggleDropdown}>
            <span><img src={img} alt=""/></span>
                Display ▼
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <div className="dropdown-section">
                        <label>Grouping</label>
                        <select value={grouping} onChange={handleGroupingChange}>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div className="dropdown-section">
                        <label>Ordering</label>
                        <select value={sorting} onChange={handleSortingChange}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
