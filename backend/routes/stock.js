const router = require("express").Router();
const StockPayment = require("../models/stock");

//route for creating database insertion
router.route("/create").post(async (req, res) => {
  const { itemCode, supID, itemName, category } = req.body;

  const qty = Number(req.body.qty);
  const date = Date(req.body.date);

  const newStockPayment = new StockPayment({
    itemCode,
    supID,
    itemName,
    category,
    qty,
    date,
  });

  await newStockPayment
    .save()
    .then((data) => res.status(200).json({ success: data }))
    .catch(() => res.status(500).json({ success: false, error: error }));
});

//route for fetching all the data
router.route("/").get(async (req, res) => {
  await StockPayment.find()
    .then((stockPayment) => res.json(stockPayment))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for getting a relavant document using id
router.route("/get/:id").get(async (req, res) => {
  const { id } = req.params;

  await StockPayment.findById(id)
    .then((stockPayments) => res.json(stockPayments))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for deleting a relavant document using id
router.route("/delete/:id").delete(async (req, res) => {
  const { id } = req.params;

  await StockPayment.findByIdAndRemove(id) //find by the document by id and delete
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for updating a relavant document using id
router.route("/update/:id").put(async (req, res) => {
  //backend route for updating relavant data and passing back
  const { id } = req.params;
  const { itemCode, supID, itemName, category, qty, date } = req.body;

  //find the document by and update the relavant data
  await StockPayment.findByIdAndUpdate(id, {
    itemCode,
    supID,
    itemName,
    category,
    qty,
    date,
  })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, error: error }));
});

module.exports = router;
