import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";

import FlightIcon from '@mui/icons-material/Flight';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ProductionIcon from '@mui/icons-material/Build';
import ScienceIcon from '@mui/icons-material/Science';


const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [

        {
            field: "_id",
            headerName: "id",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
            cellClassName: "name-column--cell"
        },

        {
            field: "firstName", headerName: "First Name",
            cellClassName: "name-column--cell"
        },
        {

            field: "address1",
            headerName: "Address 1",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: "address2",
            headerName: "Address 2",
            flex: 1,
            cellClassName: "name-column--cell"
        }, {
            field: "contact",
            headerName: "Contact",
            flex: 1,
            cellClassName: "name-column--cell"
        },

        {
            field: "email",
            headerName: "Email",
            flex: 1,
            cellClassName: "name-column--cell"
        },



        {
            field: "userRole",
            headerName: "User Role",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: ({ row: { userRole } }) => {
                return (
                    <Box
                        width="90%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            userRole === "Procurement"
                                ?
                                colors.yellow[700]
                                : userRole === "Warehouse"
                                    ? colors.yellow[600]
                                    : colors.yellow[600]
                        }
                        borderRadius="4px"
                    >
                        {userRole === "Procurement" && <ScienceIcon />}
                        {userRole === "Warehouse" && <WarehouseIcon />}
                        {userRole === "Production" && <ProductionIcon />}
                        {userRole === "Export" && <FlightIcon />}

                        <Typography color={colors.yellow[300]}
                            sx={{
                                ml: "5px"
                            }}>
                            {userRole}
                        </Typography>

                    </Box>
                )
            }
        },


    ];

    const [rows, setRows] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/route/getAllUsers")
            .then(response => {
                const rows = response.data.data.users;
                console.log("THIS IS ROWS" + rows); // check if dataRows is correct
                console.log(response.data.data.users); // check if dataRows is correct

                setRows(rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []); // add rows state as a dependency
    const getRowId = (row) => row._id;

    return (
        <Box m="20px" ml="100px">
            <Header title="CONTACTS" subtitle="List of Contacts for future Reference" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.yellow[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.yellow[400],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.black[500],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.yellow[400],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.yellow[500]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.yellow[700]} !important`,
                    }
                }}
            >

                {/* {console.log(rows.data.users)} */}

                <DataGrid rows={rows} columns={columns} getRowId={getRowId} />

                {/* <DataGrid rows={rows.data.users} columns={columns} components={{ Toolbar: GridToolbar }} /> */}
                {/* {rows.length > 0 && <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />} */}
                {/* {rows.length > 0 ? (
                    <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
                ) : (
                    <p>Loading...</p>
                )} */}
                {/* <DataGrid rows={rows || []} columns={columns} components={{ Toolbar: GridToolbar }} /> */}
                {/* {rows?.length > 0 ? (
                    <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
                ) : (
                    <p>Loading...</p>
                )} */}
            </Box>
        </Box>
    );
}

export default Contacts;
