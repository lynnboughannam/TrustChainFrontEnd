import { Box } from "@mui/material";

import Sidebar from "../global/sideBar";
import TopBar from "../global/topBar";
import { useState } from "react";


import { Routes, Route, useLocation, Outlet } from "react-router-dom"
import Form from "../ExportForm";
import ExportInvoice from "../exportInvoice";

const Export = (props) => {
    const { onUserRole, onName } = props;
    const location = useLocation();
    const [id, setId] = useState(null);
    const sidebarRoutes = ["/exportForm", `/exportForm/${id}`, "/exportInvoice"];

    // Conditionally render the Sidebar component
    const shouldShowSidebar = sidebarRoutes.includes(location.pathname);

    const handle_id = (id) => {
        setId(id);
        console.log(id)
    }

    console.log("from exportForm");

    return (
        <Box>

            {<Sidebar onName={onName} onUserRole={onUserRole} />}
            {<TopBar />}
            {/* <Routes>

                <Route path="/exportForm" element={<Form />} />
                <Route path="/exportForm/:id?" element={<Form />} />

                <Route path="/exportInvoice" element={<ExportInvoice id={handle_id} />} />

            </Routes> */}
            <Outlet context={handle_id} />

        </Box>
    )

}

export default Export;