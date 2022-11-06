import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./style.css";

const AdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/product",
      name: "Product",
      icon: <FaIcons.FaShoppingCart />,
    },
    {
      path: "/order",
      name: "Order",
      icon: <FaIcons.FaShoppingBag />,
    },
    {
      path: "/customer",
      name: "Customer",
      icon: <MdIcons.MdAccountCircle />,
    },
    {
      path: "/staff",
      name: "Staff",
      icon: <IoIcons.IoIosPeople />,
    },
    {
      path: "/",
      name: "Finance",
      icon: <AiIcons.AiOutlineCreditCard />,
    },
    {
      path: "/sup",
      name: "Supplier",
      icon: <IoIcons.IoMdPeople />,
    },
    {
      path: "/sto",
      name: "Stock",
      icon: <FaIcons.FaBoxes />,
    },
    {
      path: "/delivery",
      name: "Delivery",
      icon: <FaIcons.FaTruck />,
    },
  ];

  return (
    <div id="sidebarcontainer">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <a
            href={"/"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <h1
              style={{ display: isOpen ? "block" : "none" }}
              className="dashboard"
            >
              Dashboard
            </h1>
          </a>

          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaIcons.FaBars onClick={toggle} />
          </div>
        </div>

        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            id="sidebarlink"
            activeclassname="active"
          >
            <div className="icon">{item.icon}</div>

            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>

      <main>{children}</main>
    </div>
  );
};

export default AdminSidebar;
