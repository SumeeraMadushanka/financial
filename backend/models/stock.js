const mongoose = require("mongoose");

const StockPaymentSchema = new mongoose.Schema({
  itemCode: {
    type: String,
    required: true,
  },

  supID: {
    type: String,
    required: true,
  },

  itemName: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  qty: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Stocks", StockPaymentSchema);
