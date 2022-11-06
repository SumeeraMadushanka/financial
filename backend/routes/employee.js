const router = require("express").Router();
const EmpPayments = require("../models/employee");

//route for creating database insertion
router.route("/create").post(async (req, res) => {
  const { empID, empName } = req.body;

  const workedDays = Number(req.body.workedDays);
  const amountPerDay = Number(req.body.amountPerDay);
  const otHours = Number(req.body.otHours);
  const otRate = Number(req.body.otRate);
  const totalSalary = Number(req.body.totalSalary);

  const salaryDate = Date(req.body.salaryDate);

  const newEmpPayments = new EmpPayments({
    empID,
    empName,
    workedDays,
    amountPerDay,
    otHours,
    otRate,
    totalSalary,
    salaryDate,
  });

  await newEmpPayments
    .save()
    .then((data) => res.status(200).json({ success: data }))
    .catch(() => res.status(500).json({ success: false, error: error }));
});

//route for fetching all the data
router.route("/").get(async (req, res) => {
  await EmpPayments.find()
    .then((empPayment) => res.json(empPayment))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for getting a relavant document using id
router.route("/get/:id").get(async (req, res) => {
  const { id } = req.params;

  await EmpPayments.findById(id)
    .then((empPayments) => res.json(empPayments))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for deleting a relavant document using id
router.route("/delete/:id").delete(async (req, res) => {
  const { id } = req.params;

  await EmpPayments.findByIdAndRemove(id) //find by the document by id and delete
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for updating a relavant document using id
router.route("/update/:id").put(async (req, res) => {
  //backend route for updating relavant data and passing back
  const { id } = req.params;
  const {
    empID,
    empName,
    workedDays,
    amountPerDay,
    otHours,
    otRate,
    totalSalary,
    salaryDate,
  } = req.body;

  //find the document by and update the relavant data
  await EmpPayments.findByIdAndUpdate(id, {
    empID,
    empName,
    workedDays,
    amountPerDay,
    otHours,
    otRate,
    totalSalary,
    salaryDate,
  })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, error: error }));
});

module.exports = router;
