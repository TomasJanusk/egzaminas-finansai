import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddIncome = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [income, setIncome] = useState({
    period: "",
    title: "",
    amount: "",
  });

  const handleChange = (e) => {
    setIncome({
      ...income,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }
      const response = await axios.post(
        "http://localhost:8080/api/v1/incomes",
        income,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("income added:", response.data);
      setIncome({ from: "", to: "", title: "", amount: "" });
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Failed to add photo. Please try again.");
    }
  };

  return (
    <div className="container">
      <form
        className="p-4 p-md-5 border rounded-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded"
        onSubmit={handleSubmit}
      >
        <div
          className="dropdown-menu d-block position-static p-2 mx-0 "
          data-bs-theme="light"
        >
          <div className="d-grid gap-1">
            <div className="cal">
              <div className="cal-month">
                <select
                  className="form-select cal-month-name "
                  name="period"
                  value={income.period}
                  onChange={handleChange}
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={income.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="0.0"
            name="amount"
            value={income.amount}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            ADD
          </button>
        </div>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default AddIncome;
