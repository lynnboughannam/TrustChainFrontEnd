import { Box } from "@mui/material";
import { useState } from "react";

import Sidebar from "../global/sideBar";
import TopBar from "../global/topBar";
import ProgressTable from "../progressTable";

import { Routes, Route, useLocation, Outlet } from "react-router-dom"
import HomePage from "../home/Home";
import Form from "../dataWarehouse";
import Sections from "../Sections";
import FormWarehouse from "../dataWarehouse";

const Warehouse = (props) => {
    const { onUserRole, onName } = props;
    const location = useLocation();
    const [id, setId] = useState(null); // initialize with null value


    const sidebarRoutes = ["/warehouse", "/datawarehouse", `/datawarehouse/${id}`, "/sections"];

    // Conditionally render the Sidebar component
    const shouldShowSidebar = sidebarRoutes.includes(location.pathname);


    const handle_id = (id) => {
        setId(id);
        console.log("idddddddddd")
        console.log(id)
    }

    return (
        <Box>

            {<Sidebar onName={onName} onUserRole={onUserRole} />}
            {<TopBar />}
            {/* <Routes>
               

                <Route path="/warehouse" element={<ProgressTable id={handle_id} />} />
                <Route path="/datawarehouse" element={<FormWarehouse />} />
                <Route path="/datawarehouse/:id?" element={<FormWarehouse />} />

                <Route path="/sections" element={<Sections />} />


            </Routes> */}
            <Outlet context={handle_id} />

        </Box>
    )

}

export default Warehouse;