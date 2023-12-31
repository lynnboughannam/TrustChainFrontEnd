import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import { mockDataTeam } from "../../data/mockData"

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        {
            field: "id", headerName: "ID",
            cellClassName: "name-column--cell"
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
            cellClassName: "name-column--cell"
        },
        {
            field: "phone",
            headerName: "Phone Number",
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
            field: "accessLevel",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            access === "admin"
                                ?
                                colors.yellow[700]
                                : access === "manager"
                                    ? colors.yellow[600]
                                    : colors.yellow[600]
                        }
                        borderRadius="4px"
                    >
                        {access === "Procurement" && <AdminPanelSettingsOutlinedIcon />}
                        {access === "Warehouse" && <SecurityOutlinedIcon />}
                        {access === "Production" && <LockOpenOutlinedIcon />}
                        {access === "Export" && <LockOpenOutlinedIcon />}

                        <Typography color={colors.yellow[300]}
                            sx={{
                                ml: "5px"
                            }}>
                            {access}
                        </Typography>

                    </Box>
                )
            }
        },
    ]
    return (
        <Box m="20px" ml="120px">

            <Header title="TEAM" subtitle="Managing Team Members" />
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
                        color: `${colors.yellow[700]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
            </Box>
        </Box>
    );

}

export default Team;