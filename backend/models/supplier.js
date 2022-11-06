const mongoose = require("mongoose");

const SupPaymentSchema = new mongoose.Schema({
  supID: {
    type: String,
    required: true,
  },

  supName: {
    type: String,
    required: true,
  },

  phoneNo: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  companyName: {
    type: String,
    required: true,
  },

  companyAddress: {
    type: String,
    required: true,
  },

  paymentStatus: {
    type: String,
  },
});

module.exports = mongoose.model("supplierSchema", SupPaymentSchema);
