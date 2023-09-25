import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import { mockDataInvoices } from "../../data/mockData"
import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../../components/Header";

const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    console.log("from invoices");

    const [rows, setRows] = useState([]);
    const [procurements, setProcurements] = useState([]);
    const [idprocurements, setIdProcurements] = useState([]);



    useEffect(() => {
        axios.get("http://localhost:5000/Production/getAll")
            .then(response => {
                const rows = response.data;
                console.log("THIS IS ROWS" + rows); // check if dataRows is correct
                console.log(response.data); // check if dataRows is correct
                console.log("response.data.procurement");

                console.log(response.data);


                setRows(rows);
                const procurementArrays = rows.map((item, index) => {
                    console.log(index);
                    console.log('Procurement:', item.procurement);

                    return item.procurement;

                });
                setIdProcurements(procurementArrays);
                console.log("idprocurements!!!!!!!!!!1")
                console.log(idprocurements)


            })
            .catch(error => {
                console.log(error);
            });
    }, []); // add rows state as a dependency
    const getRowId = (row) => row._id;

    const columns = [


        {
            field: "packaging",
            headerName: "Packaging",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: "procurement",
            headerName: "Procurements",
            flex: 1,
            cellClassName: "name-column--cell",
            // renderCell: (params) => (
            //     <span>
            //         {procurements.join(', ')} </span>
            // ),
        },

        {
            field: "quantity",
            headerName: "Quantity",
            flex: 1,
            cellClassName: "name-column--cell"
        },



        {
            field: "unitCost",
            headerName: "Cost",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params) => (
                <Typography color={colors.yellow[600]}>
                    ${params.row.unitCost}
                </Typography>
            ),

        },
        {
            field: "totalCost",
            headerName: "Total Cost",
            flex: 1,
            cellClassName: "name-column--cell",
            valueGetter: (params) => params.row.quantity * params.row.unitCost, // calculate the total cost
            renderCell: (params) => (
                <Typography color={colors.yellow[600]}>
                    ${params.value}
                </Typography>
            )
        }


    ]

    const getTotalCost = () => {
        const total = rows.reduce((acc, cur) => acc + cur.unitCost, 0);
        return `$${total.toFixed(2)}`;
    };

    const footerRow = {
        id: "total",
        packaging: "",
        quantity: "",
        unitCost: getTotalCost(),
    };
    return (
        <Box m="20px" ml="100px">

            <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
                <DataGrid checkboxSelection rows={rows} getRowId={getRowId} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );

}

export default Invoices;