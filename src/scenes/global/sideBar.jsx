import { useState, useEffect, useRef } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import StorageIcon from "@mui/icons-material/Storage";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import axios from "axios";


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.yellow[300],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState("Dashboard");

    // const { onName, onUserRole } = props

    // Retrieve userRole and name from localStorage
    const onUserRole = localStorage.getItem("userRole");
    const onName = localStorage.getItem("name");

    console.log("from side bar name " + onName + " role: " + onUserRole)



    const sidebarRef = useRef(null);

    // Add event listener to detect clicks outside the sidebar
    useEffect(() => {
        const handleClickOutsideSidebar = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsCollapsed(true);
            }
        };

        document.addEventListener("click", handleClickOutsideSidebar);

        return () => {
            document.removeEventListener("click", handleClickOutsideSidebar);
        };
    }, []);

    return (
        <Box mt={0} ref={sidebarRef}
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.black[300]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#D98F01 !important",
                },
                "& .pro-menu-item.active": {
                    color: "#D98F01 !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}
                style={{
                    position: "fixed"
                }}
            >
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.yellow[300],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        alt="profile-user"
                                        width="50px"
                                        height="40px"
                                        src={"../../assets/truck.png"}
                                        style={{ cursor: "pointer" }}
                                    />
                                </Box>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon sx={{ color: "#D98F01 !important", }} />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="50px"
                                    height="50px"
                                    src={`../../assets/profile.png`}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h3"
                                    color={colors.yellow[500]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {onName}
                                </Typography>
                                <Typography variant="h5" color={colors.yellow[800]}>
                                    {onUserRole} Team
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {onUserRole === "Supply" &&

                            <Item
                                title="Dashboard"
                                to="/supply/dashboard"
                                icon={<HomeOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        }
                        <Typography
                            variant="h6"
                            color={colors.brown[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Data
                        </Typography>
                        {onUserRole === "Warehouse" &&
                            <>
                                <Box
                                    sx={{
                                        mt: 15
                                    }}
                                >
                                    <Item
                                        title="Sections"
                                        to="/warehouse/sections"
                                        icon={<StoreMallDirectoryIcon />}
                                        selected={selected}
                                        setSelected={setSelected}

                                    />
                                    <Item
                                        title="Warehouse"
                                        to="/warehouse/warehousetable"
                                        icon={<StorageIcon />}
                                        selected={selected}
                                        setSelected={setSelected}

                                    />


                                    <Item
                                        title="Data Warehouse"
                                        to="/warehouse/datawarehouse"
                                        icon={<TableChartIcon />}
                                        selected={selected}
                                        setSelected={setSelected}

                                    />

                                </Box>
                            </>

                        }
                        {onUserRole === "Procurement" &&
                            <>
                                <Box
                                    sx={{
                                        mt: 20
                                    }}
                                >


                                    <Item
                                        title="Procurement Form"
                                        to="/procurement/dataProcurement"
                                        icon={<ReceiptOutlinedIcon />}


                                        selected={selected}
                                        setSelected={setSelected}

                                    />
                                    <Item
                                        title="Procurement Data"
                                        to="/procurement/tableProcurement"
                                        icon={<TableChartIcon />}
                                        selected={selected}
                                        setSelected={setSelected}

                                    />
                                </Box>
                            </>

                        }   {onUserRole === "Export" &&
                            <>
                                <Box
                                    sx={{
                                        mt: 20
                                    }}
                                >

                                    <Item
                                        title="Invoices Balances"
                                        to="/export/exportInvoice"
                                        icon={<ReceiptOutlinedIcon />}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />

                                    <Item
                                        title="Export Form"
                                        to="/export/exportForm"
                                        icon={<TableChartIcon />}
                                        selected={selected}
                                        setSelected={setSelected}

                                    />
                                </Box>
                            </>

                        } {onUserRole === "Production" &&
                            <>
                                <Box
                                    sx={{
                                        mt: 20
                                    }}
                                >

                                    <Item
                                        title="Invoices Balances"
                                        to="/production/invoicesProd"
                                        icon={<ReceiptOutlinedIcon />}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />

                                    <Item
                                        title="Production Form"
                                        to="/production/formProd"
                                        icon={<TableChartIcon />}
                                        selected={selected}
                                        setSelected={setSelected}

                                    />

                                    <Item
                                        title="Product"
                                        to="/production/products"
                                        icon={<StorageIcon />}
                                        selected={selected}
                                        setSelected={setSelected}

                                    />
                                </Box>
                            </>

                        }
                        {onUserRole === "Supply" &&
                            <>
                                {/* <Item
                                    title="Manage Team"
                                    to="/team"
                                    icon={<PeopleOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                /> */}
                                <Item
                                    title="Contacts Information"
                                    to="/supply/contacts"
                                    icon={<ContactsOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />


                                <Typography
                                    variant="h6"
                                    color={colors.brown[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    Pages
                                </Typography>
                                <Item
                                    title="Profile Form"
                                    to="/supply/form"
                                    icon={<PersonOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                {/* <Item
                                    title="Calendar"
                                    to="/calendar"
                                    icon={<CalendarTodayOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                /> */}

                                <Typography
                                    variant="h6"
                                    color={colors.brown[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    Charts
                                </Typography>
                                <Item
                                    title="Bar Chart"
                                    to="/supply/bar"
                                    icon={<BarChartOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Pie Chart"
                                    to="/supply/pie"
                                    icon={<PieChartOutlineOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                {/* <Item
                                    title="Line Chart"
                                    to="/line"
                                    icon={<TimelineOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                /> */}
                                <Item
                                    title="Geography Chart"
                                    to="/supply/geography"
                                    icon={<MapOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>}

                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;