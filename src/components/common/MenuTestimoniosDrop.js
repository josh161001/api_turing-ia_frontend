import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const MenuTestimoniosDrop = ({ name, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="">
      <button
        type="button"
        className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
        </svg>

        <span className="flex-1 pr-20 whitespace-nowrap">{name}</span>
        <svg
          className={`w-3 h-3 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <ul className={`${isOpen ? "block" : "hidden"} py-2 space-y-2`}>
        {options.map((option, index) => (
          <li key={index}>
            <NavLink
              to={option.to}
              className={({ isActive }) =>
                `flex items-center w-full ${
                  isActive ? "bg-gray-700" : ""
                } p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`
              }
            >
              {option.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MenuTestimoniosDrop;
