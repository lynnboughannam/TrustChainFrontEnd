import { Box, Button, TextField, Typography, Radio, RadioGroup, FormControlLabel, useTheme, Snackbar, Alert } from "@mui/material";
import { Formik, } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const userSchema = yup.object().shape({
    lastName: yup.string().required("required"),
    firstName: yup.string().required("required"),

    email: yup.string().email("Invalid Email").required("required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),


})
const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        address1: "",
        address2: "",
        userRole: "",

    })
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const isNonMobile = useMediaQuery("min-width:600px");

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const handleSubmit = async (event) => {
        console.log(formData)
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/route/signup', formData);
            setSnackbarMessage("User added successfully!");
            console.log(response.data);
        } catch (error) {
            console.log(error);
            setSnackbarMessage("Error adding user. Please try again later.");
        }
    };
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <Box m="20px" ml="100px"
        >

            <Snackbar
                open={snackbarMessage !== ""}
                autoHideDuration={6000}
                onClose={() => setSnackbarMessage("")}
                message={snackbarMessage}
            />
            {/* <Alert >{snackbarMessage}</Alert>

            </Snackbar> */}
            <Header title="CREATE USER" subtitle="Create a New User Profile" />
            <Formik
                onSubmit={handleSubmit}
                // initialValues={initialValues}
                validationSchema={userSchema}>

                {({ values, errors, touched, handleBlur }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax(0,4fr))"
                            sx={{
                                "'& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                            }}
                        >

                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>

                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>

                            <TextField fullwidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>

                            <TextField fullwidth
                                variant="filled"
                                type="password"
                                label="Password Confirm"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.passwordConfirm}
                                name="passwordConfirm"
                                error={!!touched.passwordConfirm && !!errors.passwordConfirm}
                                helperText={touched.passwordConfirm && errors.passwordConfirm}
                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>
                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>
                            <Box
                                sx={{
                                    gridColumn: "span 2",
                                    gridRow: "span 2",
                                    // "& .Mui-checked !important": {
                                    //     color: colors.darkbrown[600]
                                    // }
                                }}


                            >
                                <Typography variant="h3">Role</Typography>
                                <RadioGroup aria-label="userRole" name="userRole" value={formData.userRole} onChange={handleChange}
                                    className="custom-radio-group"
                                >
                                    <FormControlLabel
                                        value="Procurement"

                                        label="Procurement"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                    />
                                    <FormControlLabel
                                        value="Warehouse"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                        label="Warehouse" />
                                    <FormControlLabel
                                        value="Production"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                        label="Production" />
                                    <FormControlLabel
                                        value="Export"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                        label="Export" />
                                </RadioGroup>
                            </Box>


                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Contact Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.contact}
                                name="contact"
                                error={!!touched.contact && !!errors.contact}
                                helperText={touched.contact && errors.contact}
                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>

                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Address 1"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.address1}
                                name="address1"
                                error={!!touched.address1 && !!errors.address1}
                                helperText={touched.address1 && errors.address1}
                                sx={{ gridColumn: "span 4" }}
                                color="secondary"

                            >
                            </TextField>

                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Address 2"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.address2}

                                name="address2"
                                error={!!touched.address2 && !!errors.address2}
                                helperText={touched.address2 && errors.address2}
                                sx={{ gridColumn: "span 4" }}
                                color="secondary"

                            >
                            </TextField>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New User
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}
export default Form;