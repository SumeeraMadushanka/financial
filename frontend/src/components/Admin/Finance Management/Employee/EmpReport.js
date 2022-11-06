import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import moment from "moment";
import "./report.css";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ReportData: [],
    };
  }
  printDocument() {
    const input = document.getElementById("pdfdiv");
    html2canvas(input).then((canvas) => {
      const doc = new jsPDF("p", "mm", "a4");
      doc.setTextColor(255, 0, 0);
      doc.setFontSize(28);
      doc.text(52, 10, "Financial Management");
      doc.setTextColor(0, 0, 255);
      doc.setFontSize(16);
      doc.text(10, 50, "Financial Details");
      doc.setTextColor(0,0,0);
      doc.setFontSize(12);
      doc.text(145, 60, "Signature :");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      var imgHeight = (canvas.height * 200) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "JPEG", 5, 70, 200, imgHeight);
      const date = Date().split(" ");
      // we use a date string to generate our filename.
      const dateStr =
        "financial_" + date[0] + date[1] + date[2] + date[3] + date[4];
      doc.save(`report_${dateStr}.pdf`);
    });
  }

  componentDidMount() {
    axios.get("/financial/").then((response) => {
      this.setState({
        ReportData: response?.data,
      });
    });
  }
  render() {
    return (
      <div>
        <center>
          <header
            className="shadow"
            style={{
              background: "#7b4397" /* fallback for old browsers */,
              background:
                "-webkit-linear-gradient(to right, #dc2430, #7b4397)" /* Chrome 10-25, Safari 5.1-6 */,
              background:
                "linear-gradient(to right, #dc2430, #7b4397)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
            }}
          >
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1
                className="text-3xl font-bold text-gray-900"
                style={{ color: "#f4f4f4", fontFamily: "cursive" }}
              >
                Financial Report 😍
              </h1>
            </div>
          </header>
        </center>
        <TableContainer id="pdfdiv" style={{ width: "1125px"}} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableCell>EmpID</TableCell>
              <TableCell>Emp Name</TableCell>
              <TableCell>Worked Days</TableCell>
              <TableCell>Amount Per Day(Rs)</TableCell>
              <TableCell>OT Hours</TableCell>
              <TableCell>OT Rate</TableCell>
              <TableCell>Salary Date</TableCell>
              <TableCell>Total Salary(Rs)</TableCell>
            </TableHead>
            <TableBody>
              {this.state?.ReportData?.map((p, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{p.empID}</TableCell>
                    <TableCell>{p.empName}</TableCell>
                    <TableCell>{p.workedDays}</TableCell>
                    <TableCell>{p.amountPerDay}</TableCell>
                    <TableCell>{p.otHours}</TableCell>
                    <TableCell>{p.otRate}</TableCell>
                    <TableCell>
                      {moment(p.salaryDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{p.totalSalary.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>{" "}
        <br />
        <br />
        <center>
          <div>
            <button
              className="info__button"
              onClick={this.printDocument}
              variant="contained"
              color="primary"
            >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i> Download PDF
            </button>
            <br />

            <Link to="/">
              <button
                variant="contained"
                color="primary"
                style={{ float: "right", background: "lightgreen" }}
              >
                <i class="fa fa-reply" aria-hidden="true"></i> Go Back
              </button>
            </Link>
          </div>
        </center>
        <br />
        <br />
      </div>
    );
  }
}
