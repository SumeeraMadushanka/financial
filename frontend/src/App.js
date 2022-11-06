import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSidebar from "./components/Admin/AdminSidebar";
import AllEmployeeDetails from "./components/Admin/Finance Management/Employee/AllEmployeeDetails";
import CreateEmpPayment from "./components/Admin/Finance Management/Employee/CreateEmpPayment";
import EditEmpPayment from "./components/Admin/Finance Management/Employee/EditEmpPayment";
import EmpReport from "./components/Admin/Finance Management/Employee/EmpReport";
import AllSupPaymentDetails from "./components/Admin/Finance Management/Supplier/AllSupPaymentDetails";
import AllStock from "./components/Admin/Finance Management/Stock/AllStock";
// import CreateSupPayment from "./components/Admin/Supplier Management/CreateSupPayment";
// import EditSupPayment from "./components/Admin/Supplier Management/EditSupPayment";
// import SupReport from "./components/Admin/Supplier Management/SupReport";

function App() {
  return (
    <div className="container">
      <Router>
        <AdminSidebar>
          <Routes>
            <Route path="/" element={<AllEmployeeDetails />} />
            <Route path="/financialAdd" element={<CreateEmpPayment />} />
            <Route path="/financialEdit/:id" element={<EditEmpPayment />} />
            <Route path="/financialReport" element={<EmpReport />} />
            <Route path="/suppliers" element={<AllSupPaymentDetails />} />
            <Route path="/stock" element={<AllStock />} />
            {/* <Route path="/suppliersAdd" element={<CreateSupPayment />} />
            <Route path="/suppliersEdit/:id" element={<EditSupPayment />} />
            <Route path="/suppliersReport" element={<SupReport />} /> */}
          </Routes>
        </AdminSidebar>
      </Router>
    </div>
  );
}

export default App;
