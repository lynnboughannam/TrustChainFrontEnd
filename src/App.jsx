import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import Procurement from "./scenes/Procurement"
import HomePage from "./scenes/home/Home";
import Form from "./scenes/dataProcurement";

import TableProcurement from "./scenes/tableProcurements";
import { useState } from "react";
import Production from "./scenes/Production";
import Invoices from "./scenes/invoices";
import Products from "./scenes/Products";
import FormProd from "./scenes/formProd";
import ProgressTable from "./scenes/progressTable";
import FormWarehouse from "./scenes/dataWarehouse";
import Sections from "./scenes/Sections";
import Warehouse from "./scenes/Warehhouse";
import Export from "./scenes/Export"
import FormExport from "./scenes/ExportForm";
import ExportInvoice from "./scenes/exportInvoice"
import Dashboard from "./scenes/dashboards/index";
import Sidebar from "./scenes/global/sideBar";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Forms from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar";
import Supply from "./scenes/Supply";
import AuthGuard from "./scenes/AuthGuard";

function App() {
    const [theme, colorMode] = useMode();

    // const [userRole, setUserRole] = useState(null); // initialize with null value
    // const [name, setName] = useState(null); // initialize with null value

    // Initialize userRole and name with values from localStorage (or null)
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);
    const [name, setName] = useState(localStorage.getItem("name") || null);



    const handleUserRole = (role) => {
        setUserRole(role);
        localStorage.setItem("userRole", role); // Save to localStorage
    };

    const handleName = (getname) => {
        setName(getname);
        localStorage.setItem("name", getname); // Save to localStorage
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Routes>

                    <Route path="/" element={<HomePage onUserRole={handleUserRole} onName={handleName} />} />
                    <Route path="/procurement" element={<AuthGuard allowedRoles={["Procurement"]}><Procurement onUserRole={userRole} onName={name} /></AuthGuard>} >



                        <Route path="dataProcurement" element={<Form />} />
                        <Route path="dataProcurement/:id?" element={<Form />} />

                        <Route path="tableProcurement" element={<TableProcurement />} />
                    </Route>

                    <Route path="/production" element={<AuthGuard allowedRoles={["Production"]}><Production onUserRole={userRole} onName={name} /></AuthGuard>} >
                        <Route path="invoicesProd" element={<Invoices />} />
                        <Route path="formProd" element={<FormProd />} />
                        <Route path="formProd/:id?" element={<FormProd />} />

                        <Route path="products" element={<Products />} />


                    </Route>

                    <Route path="/warehouse" element={<AuthGuard allowedRoles={["Warehouse"]}><Warehouse onUserRole={userRole} onName={name} /></AuthGuard>}>


                        <Route path="warehousetable" element={<ProgressTable />} />
                        <Route path="datawarehouse" element={<FormWarehouse />} />
                        <Route path="datawarehouse/:id?" element={<FormWarehouse />} />

                        <Route path="sections" element={<Sections />} />

                    </Route>

                    <Route path="/export" element={<AuthGuard allowedRoles={["Export"]}><Export onUserRole={userRole} onName={name} /></AuthGuard>}>
                        <Route path="exportForm" element={<FormExport />} />
                        <Route path="exportForm/:id?" element={<FormExport />} />

                        <Route path="exportInvoice" element={<ExportInvoice />} />

                    </Route>

                    <Route path="/supply" element={<AuthGuard allowedRoles={["Supply"]}><Supply onUserRole={userRole} onName={name} /></AuthGuard>}>

                        <Route path="dashboard" element={<Dashboard />} />

                        <Route path="team" element={<Team />} />
                        <Route path="contacts" element={<Contacts />} />
                        <Route path="form" element={<Forms />} />
                        <Route path="bar" element={<Bar />} />
                        <Route path="pie" element={<Pie />} />
                        <Route path="line" element={<Line />} />
                        <Route path="geography" element={<Geography />} />
                    </Route>

                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App;
