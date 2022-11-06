const router = require("express").Router();
const SupplierPayment = require("../models/suplierPayment");

//route for creating database insertion
router.route("/create").post(async (req, res) => {
  const { supID } = req.body;
  const workedDays = Number(req.body.workedDays);
  const amountPerDay = Number(req.body.workedDays);
  const otHours = Number(req.body.workedDays);
  const otRate = Number(req.body.workedDays);
  const totalSalary = Number(req.body.workedDays);

  const newSupplierPayments = new SupplierPayment({
    supID,
    workedDays,
    amountPerDay,
    otHours,
    otRate,
    totalSalary,
  });

  await newSupplierPayments
    .save()
    .then((data) => res.status(200).json({ success: data }))
    .catch(() => res.status(500).json({ success: false, error: error }));
});

//route for fetching all the data
router.route("/").get(async (req, res) => {
  await SupplierPayment.find()
    .then((supPayment) => res.json(supPayment))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for getting a relavant document using id
router.route("/get/:id").get(async (req, res) => {
  const { id } = req.params;

  await SupplierPayment.findById(id)
    .then((supPayments) => res.json(supPayments))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

module.exports = router;
