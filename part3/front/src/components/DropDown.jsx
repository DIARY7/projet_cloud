import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ label, items, isOpen, toggleDropdown, ariaLabel }) => {
    const [closeTimeout, setCloseTimeout] = useState(null);

    const handleMouseEnter = () => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }
        toggleDropdown(true);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            toggleDropdown(false);
        }, 100);
        setCloseTimeout(timeout);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter} // Open on hover
            onMouseLeave={handleMouseLeave} // Close with delay when hover ends
        >
            <button
                onBlur={() => setTimeout(() => toggleDropdown(false), 200)}
                className="text-white hover:text-yellow-500 focus:outline-none"
                aria-expanded={isOpen}
                aria-label={ariaLabel || label}
            >
                {label}
            </button>
            {isOpen && (
                <div className="absolute bg-white text-black p-2 mt-1 rounded-lg shadow-lg w-48 z-10">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            to={item.link}
                            className="block px-4 py-2 text-sm hover:bg-yellow-100 focus:outline-none"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;