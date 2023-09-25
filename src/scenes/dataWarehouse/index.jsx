import { Box, Button, TextField, Typography, Radio, RadioGroup, FormControlLabel, useTheme, Snackbar, Select, MenuItem } from "@mui/material";
import { Formik, } from "formik";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header"
import { tokens } from "../../theme";
import axios from "axios";
import { useParams } from 'react-router-dom';

const dataSchema = yup.object().shape({

    section: yup.string().required("required"),

    manufacturer: yup
        .string()

        .required("required"),



})
const FormWarehouse = () => {
    const { id } = useParams();



    const [formData, setFormData] = useState({
        productName: "",
        section: "",

        manufacturer: "",
        usage: "",
        category: "",

    })
    useEffect(() => {
        axios
            .get("http://localhost:5000/Procurement/getAll")
            .then((response) => {
                setProductOptions(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [productOptions, setProductOptions] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const isNonMobile = useMediaQuery("min-width:600px");

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    useEffect(() => {
        // Fetch data from the backend for editing
        if (id) {
            axios.get(`http://localhost:5000/Warehouse/${id}/getById`).then((response) => {
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
                // Perform update operation
                await axios.patch(`http://localhost:5000/Warehouse/${id}/updateProduct`, formData).then((response) => {
                    // Handle successful edit
                    setSnackbarMessage("data edited successfully!");
                });

            } catch (error) {
                console.log(error);
                setSnackbarMessage("Error editing data. Please try again later.");
            }
        }
        else {

            try {

                const response = await axios.post('http://localhost:5000/Warehouse/addProduct', formData);
                setSnackbarMessage("data added successfully!");
                console.log(response.data);

            } catch (error) {
                console.log(error);
                setSnackbarMessage("Error adding data. Please try again later.");
            }

        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
            productName: event.target.value,
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
                            <Select

                                value={formData.productName}
                                onChange={handleChange}
                            >
                                {productOptions.map(product => (
                                    <MenuItem key={product.productName} value={product.productName}>

                                        {product.productName}
                                    </MenuItem>
                                ))}
                            </Select>



                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Section"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.section}
                                name="section"
                                required
                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>


                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Usage"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.usage}
                                name="usage"
                                required
                                sx={{ gridColumn: "span 2" }}
                                color="secondary"

                            >
                            </TextField>

                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Manufacturer"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.manufacturer}
                                name="manufacturer"
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
                                <Typography variant="h3">Category</Typography>
                                <RadioGroup aria-label="category" name="category" value={formData.dataCategory} onChange={handleChange}
                                    className="custom-radio-group"
                                    required
                                >
                                    <FormControlLabel
                                        value="Skin care"

                                        label="Skin Care"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                    />
                                    <FormControlLabel
                                        value="Sun Care"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                        label="Sun Care" />
                                    <FormControlLabel
                                        value="Hair Care"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                        label="Hair Care" />
                                    <FormControlLabel
                                        value="Body Care"
                                        control={<Radio style={{ color: colors.darkbrown[600] }} />}

                                        label="Body Care" />
                                </RadioGroup>
                            </Box>





                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Add Data
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}
export default FormWarehouse;