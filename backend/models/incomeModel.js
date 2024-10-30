const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  period: {
    type: String,
    required: [true, "Please set date"],
  },
  
  title: {
    type: String,
    trim: true,
    required: [true, "Please write the title"],
  },
  amount: {
    type: Number,
    required: [true, "Please input amount"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
