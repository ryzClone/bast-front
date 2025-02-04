import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi"; // Importing the 3 dots icon
import "./Hr.css";
import hrData from "./hr-base"; // Importing the data

import Personal1 from "./img/personal-1.jfif"


const Hr = () => {
  // Dynamically create headers based on the first data entry (if exists)
  const headers = hrData.length > 0 ? Object.keys(hrData[0]) : [];

  // State to track which employee's menu is open
  const [openMenuId, setOpenMenuId] = useState(null);

  // Function to toggle the menu visibility
  const handleMenuClick = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); // Close the menu if clicked again
  };

  // Function to handle delete action
  const handleDelete = (id) => {
    console.log("Deleted employee with ID:", id);
    // Here you can add the logic to remove the employee from `hrData`
  };

  return (
    <div className="hr-container">
      {/* Header */}
      <div className="hr-header">
        <div className="hr-controls">
          <input type="text" placeholder="Search..." className="hr-search" />
          <button className="hr-button outline">Filter</button>
          <button className="hr-button primary">Add</button>
        </div>
      </div>

      {/* Table */}
      <div className="hr-table-container">
        <table className="hr-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {hrData.map((employee) => (
              <tr key={employee.id}>
                {headers.map((header, index) => (
                  <td key={index}>
                    {console.log(employee.photo)}
                    {header === "photo" ? (
                      <img
                        src={Personal1} // Backenddan kelgan to'liq URL
                        alt={employee.name}
                        className="profile-photo"
                      />
                    ) : (
                      employee[header]
                    )}
                  </td>
                ))}
                <td>
                  <div
                    className={`menu-container ${openMenuId === employee.id ? "open" : ""}`}
                  >
                    <FiMoreVertical
                      className="menu-icon"
                      onClick={() => handleMenuClick(employee.id)}
                    />
                    <div
                      className={`menu-dropdown ${
                        openMenuId === employee.id ? "visible" : ""
                      }`}
                    >
                      <button onClick={() => handleDelete(employee.id)}>Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="hr-pagination">
        <button className="hr-button outline">Previous</button>
        <button className="hr-button primary">Next</button>
      </div>
    </div>
  );
};

export default Hr;
