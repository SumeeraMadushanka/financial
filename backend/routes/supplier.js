const router = require("express").Router();
const SupPayments = require("../models/supplier");

//route for creating database insertion
router.route("/create").post(async (req, res) => {
  const {
    supID,
    supName,
    phoneNo,
    email,
    companyName,
    companyAddress,
    paymentStatus,
  } = req.body;

  const newSupPayments = new SupPayments({
    supID,
    supName,
    phoneNo,
    email,
    companyName,
    companyAddress,
    paymentStatus,
  });

  await newSupPayments
    .save()
    .then((data) => res.status(200).json({ success: data }))
    .catch(() => res.status(500).json({ success: false, error: error }));
});

//route for fetching all the data
router.route("/").get(async (req, res) => {
  await SupPayments.find()
    .then((supPayment) => res.json(supPayment))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for getting a relavant document using id
router.route("/get/:id").get(async (req, res) => {
  const { id } = req.params;

  await SupPayments.findById(id)
    .then((supPayments) => res.json(supPayments))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for updating a relavant document using id
router.route("/update/:id").put(async (req, res) => {
  //backend route for updating relavant data and passing back
  const { id } = req.params;
  const { paymentStatus } = req.body;

  //find the document by and update the relavant data
  await SupPayments.findByIdAndUpdate(id, {
    paymentStatus,
  })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, error: error }));
});


router.route("/updateStatus/:supID").put(async (req, res) => {
  const { supID } = req.params;
  const { paymentStatus } = req.body;

  await SupPayments.findOneAndUpdate(supID, {
    paymentStatus,
  })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, error: error }));
});


module.exports = router;
