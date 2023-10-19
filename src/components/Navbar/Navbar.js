import React from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.isLogout());
    localStorage.removeItem("token");
    // localStorage.removeItem("sentEmail");
    navigate("/login");
  };

  return (
    <header
      className={`bg-white p-4 shadow-md ${
        isAuthenticated && "justify-evenly"
      } flex items-center`}
    >
      <h2 className="text-xl font-semibold">Mail Box Client</h2>
      {isAuthenticated && (
        <nav className="flex items-center justify-between w-80">
          <ul className="flex space-x-4 text-white justify-center">
            <li className="text-black hover:text-gray-500 cursor-pointer">
              Home
            </li>
            <li className="text-black hover:text-gray-500 cursor-pointer">
              About us
            </li>
            <li className="text-black hover:text-gray-500 cursor-pointer">
              Contact us
            </li>
          </ul>
          <button
            className="border py-1 px-2 rounded-sm font-semibold hover:border-gray-700 hover:shadow-md"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
