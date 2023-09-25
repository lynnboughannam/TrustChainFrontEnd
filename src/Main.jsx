import { ColorModeContext, useMode } from "./theme"
import { Box } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom"
import React, { useState } from 'react';
import Topbar from "./scenes/global/topBar"
import Dashboard from "./scenes/dashboards/index";
import Sidebar from "./scenes/global/sideBar";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Production from "./scenes/Production";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar";
import ProgressTable from "./scenes/progressTable";
import HomePage from "./scenes/home/Home";

import Procurement from "./scenes/Procurement";


function Main(props) {
  //const [theme, colorMode] = useMode();
  const { onUserRole, onName } = props;


  // Get the current location from react-router-dom
  const location = useLocation();

  // Define the routes that should show the Sidebar
  const sidebarRoutes = ["/dashboard", "/team", "/invoicesProd", "/contacts", "/invoices", "/form", "/bar", "/pie", "/line", "/geography", "/calendar", "/warehouse"];

  // Conditionally render the Sidebar component
  const shouldShowSidebar = sidebarRoutes.includes(location.pathname);

  // Conditionally render the Topbar component
  //const details = { user: "John", team: "Supply Team", userRole: "supply" };

  return (
    <Box>
      {/* Conditionally render the Sidebar */}
      {shouldShowSidebar && <Sidebar onName={onName} onUserRole={onUserRole} />}
      {/* Conditionally render the Topbar */}
      {shouldShowSidebar && <Topbar onName={onName} onUserRole={onUserRole} />}

      <Routes>

        <Route path="/" element={<HomePage onName={onName} onUserRole={onUserRole} />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/form" element={<Form />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/line" element={<Line />} />
        <Route path="/geography" element={<Geography />} />
        <Route path="/Proc" element={<Procurement />} />
        <Route path="/warehouse" element={<ProgressTable />} />
        <Route path="/invoicesProd" element={<Production />} />


      </Routes>
    </Box>

  );
}

export default Main;
