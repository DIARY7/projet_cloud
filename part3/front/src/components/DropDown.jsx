import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ label, items, isOpen, toggleDropdown, ariaLabel }) => (
    <div
        className="relative"
        onMouseEnter={() => toggleDropdown(true)} // Open on hover
        onMouseLeave={() => toggleDropdown(false)} // Close when hover ends
    >
        <button
            onBlur={() => setTimeout(() => toggleDropdown(false), 200)} // Close dropdown when focus is lost
            className="text-white hover:text-yellow-500 focus:outline-none"
            aria-expanded={isOpen}
            aria-label={ariaLabel || label} // Accessibility improvement
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

export default Dropdown;