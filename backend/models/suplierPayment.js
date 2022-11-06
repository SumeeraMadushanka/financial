const mongoose = require("mongoose");

const SupplierPayment = new mongoose.Schema({
  supID: {
    type: String,
  },

  workedDays: {
    type: Number,
  },

  amountPerDay: {
    type: Number,
  },

  otHours: {
    type: Number,
  },

  otRate: {
    type: Number,
  },

  totalSalary: {
    type: Number,
  },
});

module.exports = mongoose.model("supplierPayment", SupplierPayment);
