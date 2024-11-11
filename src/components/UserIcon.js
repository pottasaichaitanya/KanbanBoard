import React from 'react';
import './UserIcon.css';

function UserIcon({ name, available }) {
    const getInitials = (name) => {
        const initials = name.split(" ").map((word) => word[0]).join("");
        return initials.toUpperCase();
    };

    const bgColor = '#BDBDBD'; 
    return (
        <div className="user-icon" style={{ backgroundColor: bgColor }}>
            {getInitials(name)}
            <span className={`status-indicator ${available ? 'available' : 'unavailable'}`}></span>
        </div>
    );
}

export default UserIcon