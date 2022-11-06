import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";

const AllEmployeeDetails = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    //component mount
    (async () => {
      await axios //axios a promised based HTTP API
        .get("/financial/")
        .then((res) => setData(res?.data));
    })();
  }, []); //this renders only once [] dependency array

  const deleteData = async (id, type) => {
    //method for deleting a todo
    if (window.confirm("Do you want to delete !")) {
      await axios.delete(`/financial/delete/${id}`);
      await axios
        .get("/financial/")
        .then((res) => setData(res?.data))
        .catch((error) => alert(error));
    }
  };

  const filteredData = data.filter((el) => el?.empID?.indexOf(query) >= 0);

  return (
    <>
      <div
        className="bg-white shadow"
        style={{
          background: "#7b4397" /* fallback for old browsers */,
          background:
            "-webkit-linear-gradient(to right, #dc2430, #7b4397)" /* Chrome 10-25, Safari 5.1-6 */,
          background:
            "linear-gradient(to right, #dc2430, #7b4397)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        }}
      >
        <div className="max-w-lg mx-auto py-4 px-2 sm:px-6 lg:px-8 flex">
          <h1
            className="text-3xl font-bold text-gray-900 mt-2"
            style={{ color: "#f4f4f4", fontFamily: "cursive" }}
          >
            Monthly Financial Balance
          </h1>
        </div>
      </div>
      <br />

      <div className="flex flex-col ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-1">
          <div className="py-2 align-middle inline-block min-w-full ">
            <div class="flex items-center justify-between mb-4">
              <div className="flex gap-4">
                <div className="cursor-pointer bg-green-600 p-1 px-4 font-bold rounded-lg">
                  <Link to="/">Employees</Link>
                </div>
                <div className="cursor-pointer bg-green-600 p-1 px-4 font-bold rounded-lg">
                  <Link to="/suppliers">Supplier</Link>
                </div>
                <div className="cursor-pointer bg-green-600 p-1 px-4 font-bold rounded-lg">
                  <Link to="/stock">Stock</Link>
                </div>
              </div>
              <div class="border-2 border-gray-200 rounded ">
                <input
                  type="text"
                  className="px-4 py-2 w-80"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      EmpID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Emp Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Worked Days
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount Per Day
                      <span style={{ fontSize: "12px", color: "red" }}>
                        {" "}
                        &nbsp;&nbsp;(Rs)
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      OT Hours
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      OT Rate(%)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Salary Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Salary
                      <span style={{ fontSize: "12px", color: "red" }}>
                        {" "}
                        &nbsp;&nbsp;(Rs)
                      </span>
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData?.length === 0 ? ( //conditional satement
                    <center>
                      <h1 style={{ color: "red" }}>
                        Oops.. There are no Financial Yet 😒{" "}
                      </h1>
                    </center>
                  ) : (
                    filteredData?.map((value) => {
                      return (
                        <tr key={value?._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.empID}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.empName}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.workedDays}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.amountPerDay}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.otHours}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.otRate}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {moment(value?.salaryDate).format("DD/MM/YYYY")}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.totalSalary.toFixed(2)}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <p className="text-indigo-600 hover:text-indigo-900">
                              <i
                                className="fa fa-trash cursor-pointer"
                                aria-hidden="true"
                                style={{
                                  color: "red",
                                  fontSize: "20px",
                                  marginRight: "20px",
                                }}
                                onClick={() => deleteData(value._id)}
                              ></i>{" "}
                              <Link to={`/financialEdit/${value._id}`}>
                                <i
                                  className="fa fa-pencil cursor-pointer"
                                  aria-hidden="true"
                                  style={{ color: "green", fontSize: "20px" }}
                                ></i>
                              </Link>
                            </p>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex justify-between">
            <div className="cursor-pointer bg-orange-600 p-2 font-bold rounded-xl">
              <Link to="/financialAdd">ADD PAYMENT</Link>
            </div>
            <div className="font-semibold">
              <Link to="/financialReport">
                <SettingsApplicationsSharpIcon /> <u>Generate Report</u>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default AllEmployeeDetails;
