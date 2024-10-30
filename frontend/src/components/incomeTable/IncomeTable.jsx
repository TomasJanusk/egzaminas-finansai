import React from "react";
import Income from "../income/Income";

const IncomeTable = ({ data, onDelete }) => {
  return (
    <table className="table table-bordered table-striped shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <thead>
        <tr>
          <th>Period</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((income) => (
          <Income
            key={income._id}
            id={income._id}
            period={income.period}
            title={income.title}
            amount={income.amount}
            onDelete={onDelete}
          />
        ))}
        <tr>
          <th>
            <h3>Total</h3>
          </th>
          <th>
            <h3>
              $
              {data
                .reduce((total, income) => total + income.amount, 0)
                .toFixed(2)}
            </h3>
          </th>
        </tr>
      </tbody>
    </table>
  );
};

export default IncomeTable;
