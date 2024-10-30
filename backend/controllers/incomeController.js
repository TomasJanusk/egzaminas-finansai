const Income = require("../models/incomeModel");

//Routes functions

exports.getAllIncomes = async (req, res) => {
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //Advanced filtering

    let queryStr = JSON.stringify(queryObj); //convert to string
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //add $ sign to operator
    console.log(JSON.parse(queryStr)); //console and parse string from query obj

    let query = Income.find(JSON.parse(queryStr));

    //Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //Field limiting

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    //Execute query

    const incomes = await query; //filter using mongo compare operators
    res.status(200).json({
      status: "success",
      results: incomes.length,
      data: {
        incomes,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createIncome = async (req, res) => {
  try {
    const newIncome = await Income.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        income: newIncome,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getIncomeById = async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (!income) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      income,
    },
  });
};

exports.updateIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        income,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: {
        message: err,
      },
    });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    status: "success",
    data: {
      income: null,
    },
  });
};
