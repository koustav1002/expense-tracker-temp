import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleDropdown}
      >
        {" "}
        {/* Use justify-between for alignment */}
        <div>
          <p className="text-lg font-medium text-black">koustav</p>
          <span className="text-sm text-gray-700">example@codewave.com</span>
        </div>
        <RiArrowDropDownLine size={30} />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg"
        >
          <ul className="p-2">
            <li className="py-2 hover:bg-gray-100">
              <Link to="/sign-in" className="block px-4">
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
