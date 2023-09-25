import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Header from "../../components/Header";

const Invoices = () => {

    // const { id } = props;
    const id = useOutletContext();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    console.log("from invoices");
    const [selectedRowId, setSelectedRowId] = useState(null);
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/Export/getAll")
            .then(response => {
                const rows = response.data;
                console.log("THIS IS ROWS" + rows); // check if dataRows is correct
                console.log(response.data); // check if dataRows is correct

                setRows(rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []); // add rows state as a dependency


    const getRowId = (row) => row._id;

    const columns = [
        {
            field: "id", headerName: "ID",
            flex: 1,

            cellClassName: "name-column--cell"
        },

        {
            field: "packaging",
            headerName: "Packaging",
            flex: 1,
            cellClassName: "name-column--cell"
        },

        {
            field: "quantity",
            headerName: "Quantity",
            flex: 1,
            cellClassName: "name-column--cell"
        },



        {
            field: "country",
            headerName: "Country",
            flex: 1,
            cellClassName: "name-column--cell",


        },
        {
            field: "totalCost",
            headerName: "Total Cost",
            flex: 1,
            cellClassName: "name-column--cell",
            valueFormatter: (params) => `$${params.value}`,

        },


        {
            field: "edit",
            headerName: "Edit",
            flex: 0.75,
            cellClassName: "name-column--cell",
            renderCell: (params) => {


                const handleEdit = () => {
                    setSelectedRowId(params.row._id);
                    navigate(`/export/exportForm/${params.row._id}`);
                    id(params.row._id);
                };

                const handleDelete = () => {
                    console.log(params.row._id);

                    axios.delete(`http://localhost:5000/Export/${params.row._id}/deleteProduct`)

                        .then((response) => {
                            console.log(response.data);
                            setRows(rows.filter((row) => row._id !== params.row._id));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                return (
                    <Box>
                        <DeleteOutlinedIcon sx={{ mr: 5, cursor: 'pointer' }} onClick={handleDelete} />

                        <EditOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handleEdit} />
                    </Box>
                );

            }

        },


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