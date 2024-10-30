import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/signup",
        {
          name,
          email,
          password,
          passwordConfirm,
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setMessage("Registration successful!");
        navigate("/");
      } else {
        setMessage("Registration failed. No token received.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container  col-xl-10 col-xxl-8 px-4 py-5 p-3 mb-2">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-md-10 mx-auto col-lg-5">
          <h1 className="h3 mb-3 fw-normal">Please sign-up</h1>
          <form
            className="p-4 p-md-5 border rounded-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded"
            onSubmit={handleRegister}
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingNameInput"
                placeholder="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">User name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmailInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingConfirmPassword"
                placeholder="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Confirm password</label>
            </div>
            <hr className="my-4" />
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign-up
            </button>
          </form>
          {message && <p className="text-center mt-3">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
