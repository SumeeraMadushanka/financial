import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify"; //for toast messages
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";

import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SupPayment = ({ supID }) => {
  const [loading, setLoading] = useState(false);
  const [workedDays, setWorkedDays] = useState("");
  const [amountPerDay, setAmountPerDay] = useState("");
  const [otHours, setOtHours] = useState("");
  const [otRate, setOtRate] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createHandler = async (e) => {
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
      await axios
        .post(
          //use axios API
          "/supplierPayment/create",
          {
            supID,
            workedDays,
            amountPerDay,
            otHours,
            otRate,
            totalSalary: workedDays * amountPerDay + OtTotal,
          },
          config
        )
        .then(
          async () =>
            await axios.put(
              `/supplier/updateStatus/${supID}`,
              {
                paymentStatus: "Paid",
              },
              config
            )
        );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        toast("Success! Financial Added 😍");
        setWorkedDays("");
        setAmountPerDay("");
        setOtHours("");
        setOtRate("");
      }, 3000); //5seconds timeout
    } catch (error) {
      alert(error?.response?.data?.error);
      setWorkedDays("");
      setAmountPerDay("");
      setOtHours("");
      setOtRate("");
      setLoading(false);
    }
  };

  return (
    <div>
      <p
        className="text-indigo-600 hover:text-indigo-900 cursor-pointer underline"
        onClick={handleOpen}
      >
        Payment of Salary
      </p>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <center>Supplier ID : {supID}</center>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={createHandler}>
                <div className="max-w-full mx-auto">
                  <div className="px-4 sm:px-0">
                    <div>
                      <center>
                        <div
                          style={{
                            justifyContent: "space-around",
                          }}
                          className="container p-6"
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
                                label="Worked Days"
                                value={workedDays}
                                onChange={(e) => setWorkedDays(e.target.value)}
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
                                label="Amount Per Day"
                                value={amountPerDay}
                                onChange={(e) =>
                                  setAmountPerDay(e.target.value)
                                }
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
                                label="OT Rate(%)"
                                value={otRate}
                                onChange={(e) => setOtRate(e.target.value)}
                                required
                                type="number"
                              />
                            </Box>
                          </div>
                        </div>
                        <div className="pb-4">
                          <Button
                            variant="contained"
                            color="success"
                            type="submit"
                          >
                            <h6
                              style={{
                                marginLeft: "5px",
                              }}
                            >
                              {" "}
                            </h6>{" "}
                            {loading ? "Calculating..." : "Calculate"}
                          </Button>
                        </div>

                        <ToastContainer style={{ marginTop: "50px" }} />
                      </center>
                    </div>
                  </div>
                </div>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SupPayment;
