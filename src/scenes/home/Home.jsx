import { Box, Button, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";


const HomePage = (props) => {
    const { onUserRole, onName } = props;


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [error, setError] = useState(false);


    const handleLogin = async (event) => {


        try {
            const response = await axios.post('http://localhost:5000/route/login', { email, password });
            console.log(response.data);
            const userRole = response.data.data.user.userRole;
            const name = response.data.data.user.firstName;
            //  console.log("THIS IS ROWS" + userRole); // check if dataRows is correct
            console.log(userRole);
            console.log(name);

            console.log("response.data.user")
            console.log(response.data.user)

            onUserRole(userRole);
            onName(name);
            setError(false);

            switch (userRole) {
                case "Supply":

                    navigate("/supply/dashboard");
                    break;
                case "Procurement":
                    navigate("/procurement/dataProcurement");
                    break;
                case "Warehouse":
                    navigate("/warehouse/sections");
                    break;
                case "Production":
                    navigate("/production/invoicesProd");
                    break;
                case "Export":
                    navigate("/export/exportForm");
                    break;
                default:
                    navigate("/");

                    console.log(`Unknown user role: ${userRole}`);
            }
        } catch (error) {
            console.log(error);
            setError(true);
            onUserRole(null);
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    };





    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Box>

            <Grid container direction="column" spacing={5} justifyContent="flex-start" alignItems="center">
                <Grid item xs={12} mt={2}>

                    <img
                        alt="logo"
                        width="600px"
                        height="120px"
                        src={"../../assets/offLogo.png"}
                        style={{ cursor: "pointer" }}

                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3"

                        textAlign="center"
                        alignItems="center"
                        width="700px"

                        fontWeight="120"

                    >
                        Unlock the power of blockchain technology and take control of your supply chain
                        the ultimate platform for transparency, trust, and seamless collaboration.
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Button variant="outlined" onClick={handleClickOpen}
                        sx={{
                            backgroundColor: colors.black[500],
                            color: colors.yellow[600],
                            fontSize: "30px",
                            fontWeight: "700",
                            padding: "10px 20px",
                            borderRadius: "23px",
                            width: "180px",

                            height: "60px",
                            marginTop: "50px"


                        }}
                    >

                        Login
                    </Button>

                    <Dialog open={open} onClose={handleClose} onKeyPress={handleKeyPress}

                    >
                        <DialogTitle alignContent="center" style={{
                            backgroundColor: colors.black[500]
                        }}>  <Typography variant="h2" style={{
                            color: colors.yellow[500]
                        }} >
                                Let's thrive
                            </Typography></DialogTitle>


                        <DialogContent
                            style={{
                                backgroundColor: colors.black[500]
                            }}
                        >

                            <TextField

                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    color: colors.yellow[100],

                                    '& label': {
                                        color: colors.yellow[500],
                                    },
                                    '& .MuiInputBase-input': {
                                        color: colors.yellow[500],
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottomColor: colors.yellow[500],
                                    },
                                }}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="standard"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    color: colors.yellow[100],

                                    '& label': {
                                        color: colors.yellow[500],
                                    },
                                    '& .MuiInputBase-input': {
                                        color: colors.yellow[500], // change the label color
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottomColor: colors.yellow[500], // change the underline color
                                    },
                                }}

                            />
                            <DialogContentText>
                                {error && (

                                    <Typography variant="subtitle1" color="error" sx={{
                                        textAlign: "center"
                                    }}>
                                        Invalid email or password
                                    </Typography>

                                )}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions
                            style={{
                                backgroundColor: colors.black[500]
                            }}>

                            <Button onClick={handleClose}>Cancel</Button>

                            <Button onClick={handleLogin}>Login</Button>

                        </DialogActions>
                    </Dialog>



                </Grid>

            </Grid >
            <Grid container>
                <Grid item sx={{ position: 'fixed', bottom: 0, left: 0 }}>
                    <img
                        alt="arrow"
                        width="483px"
                        height=" 217px"
                        src={"../../assets/arrow.png"}


                    />
                </Grid>
                <Grid item sx={{ position: 'fixed', top: 0, left: 0 }}>
                    <img
                        alt="arrow"
                        style={{ transform: 'rotate(170deg)' }}
                        src={"../../assets/sideHome.png"}


                    />
                </Grid>
                <Grid item sx={{ position: 'fixed', top: 0, right: 0 }}>
                    <img
                        alt="arrow"
                        style={{ transform: 'rotate(-107.53deg)' }}

                        src={"../../assets/sideHome.png"}


                    />
                </Grid>
                <Grid item sx={{ position: 'fixed', bottom: 0, right: 0 }}>
                    <img
                        alt="arrow"

                        src={"../../assets/sideHome.png"}


                    />
                </Grid>
            </Grid>
        </Box >
    )

}


export default HomePage;