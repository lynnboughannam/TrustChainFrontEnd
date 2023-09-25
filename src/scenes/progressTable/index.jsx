import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import ProgressBar from "../progressBar";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate, useOutletContext } from "react-router-dom";

const ProgressTable = () => {
    // const { id } = props;
    const id = useOutletContext();

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedRowId, setSelectedRowId] = useState(null);


    const [rows, setRows] = useState([]);
    const [usage, setUsage] = useState([]);

    const [formData, setFormData] = useState({
        productName: "",
        section: "",

        manufacturer: "",
        usage: "",
        category: "",

    })


    useEffect(() => {
        axios.get("http://localhost:5000/Warehouse/getAll")
            .then(response => {
                const rows = response.data;
                const getusages = response.data.map(row => row.usage);
                console.log("THIS IS ROWS" + rows); // check if dataRows is correct
                console.log(response.data); // check if dataRows is correct
                console.log(getusages); // check if dataRows is correct

                setUsage(getusages)
                setRows(rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // add rows state as a dependency
    const getRowId = (row) => row._id;
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
            field: "section",
            headerName: "Section",
            flex: 1,
            cellClassName: "name-column--cell"

        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            cellClassName: "name-column--cell"

        },
        {
            field: "manufacturer",
            headerName: "Manufacturer",
            flex: 1,
            cellClassName: "name-column--cell"

        },
        {
            field: 'usage',
            headerName: 'Usage',
            cellClassName: "name-column--cell",

            flex: 1,
            renderCell: (params) => {
                const currentRow = params.row;
                const currentUsage = currentRow.usage;
                return <>
                    <ProgressBar value={currentUsage} />
                    <Typography>{currentUsage}</Typography>
                </>;


            },
        },

        {
            field: "edit",
            headerName: "Edit",
            flex: 0.75,
            cellClassName: "name-column--cell",
            renderCell: (params) => {


                const handleEdit = () => {
                    setSelectedRowId(params.row._id);
                    navigate(`/warehouse/datawarehouse/${params.row._id}`);
                    id(params.row._id);
                };

                const handleDelete = () => {
                    console.log(params.row._id);

                    axios.delete(`http://localhost:5000/Warehouse/${params.row._id}/deleteProduct`)

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
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                    onCellClick={(params, event) => {
                        if (params.field === "edit") {
                            event.stopPropagation(); // Prevent row selection on edit button click
                        }
                    }}
                />

            </Box>
        </Box>
    );

}

export default ProgressTable;