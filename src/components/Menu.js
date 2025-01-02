import React from "react";
import menuItems from "../store/menuItems";
import { Link } from "react-router-dom";

const Menu = ({ currentItem, setCurrentItem }) => {
  return (
    <div className="hidden md:flex items-center gap-4">
      {menuItems.map((item) => (
        <div
          key={item._id}
          className={`text-gray-700 px-6 py-2 ${
            item._id === currentItem && "bg-black text-white rounded-full"
          }`}
          onClick={() => setCurrentItem(item._id)}
        >
          <Link to={item.link}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
