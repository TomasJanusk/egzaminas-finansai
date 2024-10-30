import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IncomeTable from "../incomeTable/IncomeTable";

const Home = () => {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getIncomes = () => {
      axios
        .get(`http://localhost:8080/api/v1/incomes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIncomes(res.data.data.incomes);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getIncomes();
  }, []);

  const handleDelete = (incomeId) => {
    setIncomes(incomes.filter((income) => income._id !== incomeId));
  };

  return (
    <div className="container">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link className="nav-item btn btn-info" to="/addincome">
            ADD INCOME
          </Link>
        </li>
      </ul>
      <h1>Incomes</h1>
      <IncomeTable data={incomes} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
