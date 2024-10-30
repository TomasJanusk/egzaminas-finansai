import React from "react";
import axios from "axios";

const Income = (props) => {
  const deleteHandler = (incomeId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/api/v1/incomes/${incomeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Update the photos state after deletion
        props.onDelete(incomeId);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <tr>
      <td>{props.period}</td>

      <td>{props.title}</td>
      <td>${props.amount}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => deleteHandler(props.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Income;
