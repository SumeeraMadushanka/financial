const mongoose = require("mongoose");

const EmpPaymentSchema = new mongoose.Schema({
  empID: {
    type: String,
    required: true,
  },

  empName: {
    type: String,
    required: true,
  },

  workedDays: {
    type: Number,
    required: true,
  },

  amountPerDay: {
    type: Number,
    required: true,
  },

  otHours: {
    type: Number,
    required: true,
  },

  otRate: {
    type: Number,
    required: true,
  },

  salaryDate: {
    type: Date,
    required: true,
  },

  totalSalary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("empPayment", EmpPaymentSchema);
