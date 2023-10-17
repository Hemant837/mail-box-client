import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white p-4 shadow-md justify-evenly flex items-center">
      <h2 className="text-xl font-semibold">Mail Box Client</h2>
      <nav>
        <ul className="flex space-x-4 text-white justify-center">
          <li className="text-black hover:text-yellow-500">Home</li>
          <li className="text-black hover:text-yellow-500">About us</li>
          <li className="text-black hover:text-yellow-500">Contact us</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
