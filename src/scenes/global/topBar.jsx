import { IconButton, Box, useTheme, Typography } from "@mui/material";
import { useContext } from "react"; //helps with passing props from parent comp to grand child comp
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
// import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';


const TopBar = (props) => {

    const { onUserRole, onName } = props;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [logout, setLogout] = useState(false)


    const navigate = useNavigate();


    const handleLogout = async () => {
        // Clear local storage
        localStorage.removeItem("userRole");
        localStorage.removeItem("name");

        // Redirect to home page
        window.location.href = "/";
    };


    return (

        <Box p={2}
            display="flex"
            justifyContent="flex-end"
        >




            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    < DarkModeOutlinedIcon />

                ) :
                    <LightModeOutlinedIcon />

                }
            </IconButton>

            <IconButton onClick={handleLogout}>
                <ExitToAppIcon />
            </IconButton>
        </Box >
    )
}
export default TopBar;