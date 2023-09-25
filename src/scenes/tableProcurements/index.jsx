import { Box, useTheme, Typography, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import axios from "axios";
import Header from "../../components/Header";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const TableProcurement = (props) => {
    // const { id } = props;
    const id = useOutletContext();


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const navigate = useNavigate();
    const columns = [
        {
            field: "_id", headerName: "ID",

            cellClassName: "name-column--cell"
        },

        {
            field: "productName",
            headerName: "Product Name",
            flex: 1,
            cellClassName: "name-column--cell"

        },

        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            cellClassName: "name-column--cell",


        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 1,
            cellClassName: "name-column--cell",


        },
        {
            field: 'unitPrice',
            headerName: 'Price',
            flex: 1,
            cellClassName: "name-column--cell",

        },

        {
            field: 'supplier',
            headerName: 'Supplier',
            flex: 1,
            cellClassName: "name-column--cell",

        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: ({ row: { status } }) => {
                return (
                    <Box
                        width="90%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            status === "Recieved"
                                ?
                                "#4caf50"
                                : status === "Pending"
                                    ? colors.yellow[600]
                                    : status === "Cancelled"
                                        ?
                                        "#f44336"
                                        :
                                        colors.brown[400]
                        }
                        borderRadius="4px"
                    >


                        <Typography color={colors.yellow[300]}
                            sx={{
                                ml: "5px"
                            }}>
                            {status}
                        </Typography>

                    </Box>
                )
            }

        },


        {
            field: "edit",
            headerName: "Edit",
            flex: 0.75,
            cellClassName: "name-column--cell",
            renderCell: (params) => {


                const handleEdit = () => {
                    setSelectedRowId(params.row._id);
                    navigate(`/procurement/dataProcurement/${params.row._id}`);
                    id(params.row._id);
                };

                const handleDelete = () => {
                    console.log(params.row._id);

                    axios.delete(`http://localhost:5000/Procurement/${params.row._id}/deleteProduct`)

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

    const [rows, setRows] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/Procurement/getAll")
            .then(response => {
                const rows = response.data;
                console.log("THIS IS ROWS" + rows); // check if dataRows is correct
                console.log(response.data); // check if dataRows is correct

                setRows(rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // add rows state as a dependency
    const getRowId = (row) => row._id;
    return (
        <Box m="20px" ml="100px">

            <Header title="WAREHOUSE" subtitle="List of warehouse" />
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
                        fontSize: "15px"
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

                }}
            >

                <DataGrid rows={rows} columns={columns} getRowId={getRowId} />

            </Box>
        </Box>
    );

}

export default TableProcurement;