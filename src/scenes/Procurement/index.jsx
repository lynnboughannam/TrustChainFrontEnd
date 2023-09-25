import { Box } from "@mui/material";

import Sidebar from "../global/sideBar";
import TopBar from "../global/topBar";
import ProgressTable from "../progressTable";
import TableProcurement from "../tableProcurements";
import Form from "../dataProcurement";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useState } from "react";
import HomePage from "../home/Home";

const Procurement = (props) => {
    const { onUserRole, onName } = props;
    // const location = useLocation();


    const [id, setId] = useState(null); // initialize with null value
    // const sidebarRoutes = [`/dataProcurement/${id}`, "/dataProcurement", "/tableProcurement", "/dataProcurement/:id?"];

    // const shouldShowSidebar = sidebarRoutes.includes(location.pathname);

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


                <Route path="/dataProcurement" element={<Form />} />
                <Route path="/dataProcurement/:id?" element={<Form />} />

                <Route path="/tableProcurement" element={<TableProcurement id={handle_id} />} />


            </Routes> */}
            <Outlet context={handle_id} />


        </Box>
    )

}

export default Procurement;