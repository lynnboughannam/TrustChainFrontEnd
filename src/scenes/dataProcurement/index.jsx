import { Box, Button, TextField, Typography, Radio, RadioGroup, FormControlLabel, useTheme, Snackbar, Alert } from "@mui/material";
import { Formik, } from "formik";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header"
import { tokens } from "../../theme";
import axios from "axios";
import { useParams } from 'react-router-dom';

const dataSchema = yup.object().shape({

    productName: yup.string().required("required"),

    quantity: yup
        .string()

        .required("required"),



})

const Form = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        productName: "",
        quantity: "",
        supplier: "",
        status: "",
        unitPrice: "",
        description: "",

    })
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const isNonMobile = useMediaQuery("min-width:600px");

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    useEffect(() => {
        // Fetch data from the backend for editing
        if (id) {
            axios.get(`http://localhost:5000/Procurement/${id}/getById`).then((response) => {
                setFormData(response.data);
                console.log(response.data);
            });
        }
    }, [id]);

    const handleSubmit = async (event) => {
        console.log(formData)
        event.preventDefault();
        if (id) {
            try {
                axios.patch(`http://localhost:5000/Procurement/${id}/updateProduct`, formData).then((response) => {
                    // Handle successful edit
                    setSnackbarMessage("data edited successfully!");
                });

            } catch (error) {
                console.log(error);
                setSnackbarMessage("Error editing data. Please try again later.");
            }
        } else {
            try {
                const response = await axios.post('http://localhost:5000/Procurement/addProduct', formData);
                setSnackbarMessage("data added successfully!");
                console.log(response.data);
            } catch (error) {
                console.log(error);
                setSnackbarMessage("Error adding data. Please try again later.");
            }
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
            <Header title="Add Data" subtitle="Create a New data Profile" />
            <Formik
                onSubmit={handleSubmit}
                // initialValues={initialValues}
                validationSchema={dataSchema}>

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
                                label="Product Name"
                                onBlur={handleBlur}

                                onChange={handleChange}
                                value={formData.productName}
                                name="productName"
                                sx={{ gridColumn: "span 2" }}
                                color="secondary"
                                required
                            >
                            </TextField>



                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.description}
                                name="description"

                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>

                            <TextField fullwidth
                                variant="filled"
                                type="Number"
                                label="Quantity"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.quantity}
                                name="quantity"
                                required

                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>
                            <TextField fullwidth
                                variant="filled"
                                type="Number"
                                label="Unit Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.unitPrice}
                                name="unitPrice"
                                required

                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>
                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Supplier"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.supplier}
                                name="supplier"
                                required

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
                                <Typography variant="h3">Status</Typography>
                                <RadioGroup aria-label="status" name="status" value={formData.status} onChange={handleChange}
                                    className="custom-radio-group"
                                    required

                                >
                                    <FormControlLabel
                                        value="Pending"

                                        label="Pending"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                    />
                                    <FormControlLabel
                                        value="Ordered"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                        label="Ordered" />
                                    <FormControlLabel
                                        value="Recieved"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                        label="Recieved" />
                                    <FormControlLabel
                                        value="Cancelled"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                        label="Cancelled" />
                                </RadioGroup>
                            </Box>





                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">


                            <Button type="submit" color="secondary" variant="contained">{id ? 'Save Changes' : 'Add Data'}</Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}
export default Form;