import { Box } from "@mui/material";

import { useState } from "react";
import Sidebar from "../global/sideBar";
import TopBar from "../global/topBar";
import ProgressTable from "../progressTable";

import { Routes, Route, useLocation, Outlet } from "react-router-dom"
import HomePage from "../home/Home";
import Form from "../formProd";
import Invoices from "../invoices";
import Products from "../Products";
const Production = (props) => {
    const { onUserRole, onName } = props;
    const location = useLocation();
    const [id, setId] = useState(null); // initialize with null value

    const sidebarRoutes = ["/invoicesProd", "/formProd", `/formProd/${id}`, "/Products"];

    // Conditionally render the Sidebar component
    const shouldShowSidebar = sidebarRoutes.includes(location.pathname);


    console.log("from Production");


    const handle_id = (id) => {
        setId(id);
        console.log(id)
    }
    return (
        <Box>

            {<Sidebar onName={onName} onUserRole={onUserRole} />}
            {<TopBar />}
            {/* <Routes>

                <Route path="/invoicesProd" element={<Invoices />} />
                <Route path="/formProd" element={<Form />} />
                <Route path="/formProd/:id?" element={<Form />} />

                <Route path="/Products" element={<Products id={handle_id} />} />

            </Routes> */}

            <Outlet context={handle_id} />

        </Box>
    )

}

export default Production;