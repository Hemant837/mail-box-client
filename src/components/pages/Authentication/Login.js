import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const isEmailValid =
      enteredEmail.trim() !== "" && enteredEmail.includes("@");
    const isPasswordValid =
      enteredPassword.trim() !== "" && enteredPassword.length >= 6;

    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const navigateToSignup = () => {
    navigate("/");
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    validateForm();
    if (!isFormValid) {
      setError("Please fill out all fields correctly.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      const loginDetails = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6TbjpOY5B_akn4VQ4-DoVY0McCgUsvR4",
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }
      );

      setIsLoading(false);
      dispatch(authActions.isLogin());

      localStorage.setItem("token", loginDetails.data.idToken);

      dispatch(authActions.setIdToken(loginDetails.data.idToken));
      dispatch(authActions.setUserEmail(loginDetails.data.email));

      navigate("/dashboard/inbox");
    } catch (error) {
      setIsLoading(false);
      setError("Login failed. Please check your credentials.");
      console.log(error);
    }

    passwordInputRef.current.value = "";
  };

  return (
    <div className="text-black mt-5 mx-auto w-96">
      <div className="text-center">
        <h2 className="font-bold text-4xl">Login</h2>
        <h3 className="text-gray-400 p-3">
          Welcome back! Please enter your details
        </h3>
        <button className="border rounded border-gray-400 hover:border-gray-600 py-2 px-28 mb-4 font-semibold">
          Sign up with Google
        </button>
      </div>
      <form onSubmit={formSubmitHandler} className="mb-4">
        <div className="mb-2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border"
            ref={emailInputRef}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border"
            ref={passwordInputRef}
          />
        </div>

        {isLoading && (
          <p className="text-center text-black">Sending Request...</p>
        )}
        <button
          type="submit"
          className="bg-black hover:border-gray-800 text-white text-center w-full border py-2 px-4"
        >
          Login
        </button>
      </form>
      <button className="text-blue-500 hover:underline text-center mx-auto block">
        Forgot Password
      </button>
      <button
        className="text-center my-2 mx-auto block font-semibold"
        onClick={navigateToSignup}
      >
        Don't have an account? Sign up
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Login;
