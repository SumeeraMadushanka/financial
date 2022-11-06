import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify"; //for toast messages
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./styel.css";
import Box from "@mui/material/Box";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const EditEmpPayment = () => {
  const [empName, setEmpName] = useState("");
  const [workedDays, setWorkedDays] = useState("");
  const [amountPerDay, setAmountPerDay] = useState("");
  const [otHours, setOtHours] = useState("");
  const [otRate, setOtRate] = useState("");
  const [salaryDate, setSalaryDate] = useState("");
  const [loading, setLoading] = useState(false); //additional

  const { id } = useParams();

  useEffect(() => {
    const getDate = async () => {
      await fetch(`/financial/get/${id}`)
        .then((res) => res.json())
        .then((json) => {
          setEmpName(json.empName);
          setWorkedDays(json.workedDays);
          setAmountPerDay(json.amountPerDay);
          setOtHours(json.otHours);
          setOtRate(json.otRate);
          setSalaryDate(json.salaryDate);
        })
        .catch((err) => alert(err));
    };

    getDate();
  }, [id]);

  const updateHandler = async (e) => {
    // create handler for saving data to the db
    e.preventDefault();

    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    var OtTotal = (amountPerDay / 24) * otHours * otRate;

    try {
      await axios.put(
        //use axios API
        `/financial/update/${id}`,
        {
          empName,
          workedDays,
          amountPerDay,
          otHours,
          otRate,
          salaryDate,
          totalSalary: workedDays * amountPerDay + OtTotal,
        },
        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        toast("Financial Details Update Success 😍");
        setEmpName("");
        setWorkedDays("");
        setAmountPerDay("");
        setOtHours("");
        setOtRate("");
        setSalaryDate("");
      }, 3000); //5seconds timeout
    } catch (error) {
      alert(error?.response?.data?.error);
      setEmpName("");
      setWorkedDays("");
      setAmountPerDay("");
      setOtHours("");
      setOtRate("");
      setSalaryDate("");
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <main>
        {" "}
        <div className="mb-6 cursor-pointer bg-orange-600 p-2 font-bold w-16 rounded-xl">
          <Link to="/">BACK</Link>
        </div>
        <form onSubmit={updateHandler}>
          <div className="max-w-full mx-auto">
            <div className="px-4 sm:px-0">
              <div className="rounded-lg bg-shadow">
                <center>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                    className="container p-6 gap-4"
                  >
                    <div>
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          size="small"
                          fullWidth
                          label="Emp Name"
                          value={empName}
                          onChange={(e) => setEmpName(e.target.value)}
                          required
                        />
                      </Box>
                    </div>
                    <br />
                    <div>
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          size="small"
                          fullWidth
                          label="Worked Days"
                          value={workedDays}
                          onChange={(e) => setWorkedDays(e.target.value)}
                          required
                          type="number"
                        />
                      </Box>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                    className="container p-6 gap-4"
                  >
                    <div>
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          size="small"
                          fullWidth
                          label="Amount Per Day"
                          value={amountPerDay}
                          onChange={(e) => setAmountPerDay(e.target.value)}
                          required
                          type="number"
                        />
                      </Box>
                    </div>
                    <br />
                    <div>
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          size="small"
                          fullWidth
                          label="OT Hours"
                          value={otHours}
                          onChange={(e) => setOtHours(e.target.value)}
                          required
                          type="number"
                        />
                      </Box>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                    className="container p-6 gap-4"
                  >
                    <div>
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <spna className="text-white">""</spna>
                        <TextField
                          size="small"
                          fullWidth
                          label="OT Rate(%)"
                          value={otRate}
                          onChange={(e) => setOtRate(e.target.value)}
                          required
                          type="number"
                        />
                      </Box>
                    </div>
                    <br />
                    <div>
                      <spna className="mr-96">Salary Date</spna>
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          size="small"
                          fullWidth
                          value={moment(salaryDate).format("DD/MM/YYYY")}
                          onChange={(e) => setSalaryDate(e.target.value)}
                          required
                        />
                      </Box>
                    </div>
                  </div>
                  <div className="pb-4">
                    <Button variant="contained" color="success" type="submit">
                      <h6 style={{ marginLeft: "5px" }}> </h6>{" "}
                      {loading ? "Updating..." : "Update"}
                    </Button>
                  </div>
                  <ToastContainer style={{ marginTop: "50px" }} />
                </center>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditEmpPayment;
