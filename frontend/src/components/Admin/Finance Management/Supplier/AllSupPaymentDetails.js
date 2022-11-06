import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import SupPayment from "./SupPayment";

const AllSupPaymentDetails = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    //component mount
    (async () => {
      await axios //axios a promised based HTTP API
        .get("/supplier/")
        .then((res) => setData(res?.data));
    })();
  }, []); //this renders only once [] dependency array

  const filteredData = data.filter((el) => el?.supID?.indexOf(query) >= 0);

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
                      className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Supplier ID
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Supplier Name
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Company Name
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Company Address
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment Status
                    </th>
                    <th
                      scope="col"
                      className=" px-14 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData?.length === 0 ? ( //conditional satement
                    <center>
                      <h1 style={{ color: "red" }}>
                        Oops.. There are no Suppliers Yet 😒{" "}
                      </h1>
                    </center>
                  ) : (
                    filteredData?.map((value) => {
                      return (
                        <tr key={value?._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.supID}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.supName}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.phoneNo}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.email}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.companyName}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500">
                              {value?.companyAddress}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            {value?.paymentStatus === "Not Paid" ? (
                              <div className="text-sm text-red-600">
                                {value?.paymentStatus}
                              </div>
                            ) : (
                              <div className="text-sm text-green-600">
                                {value?.paymentStatus}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <SupPayment supID = {value.supID}/>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSupPaymentDetails;
