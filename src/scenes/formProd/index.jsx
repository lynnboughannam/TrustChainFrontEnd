import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Header from "../../components/Header";
import { useParams } from 'react-router-dom';


const productionSchema = yup.object().shape({
    packaging: yup.string().required('Packaging is required').min(3, 'Packaging must be at least 3 characters').max(255, 'Packaging must be at most 255 characters'),
    description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters').max(2000, 'Description must be at most 2000 characters'),
    quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number').integer('Quantity must be an integer'),
    unitCost: yup.number().required('Unit cost is required').min(0, 'Unit cost must be at least 0'),
    image: yup.string().required('Image is required')
});

const FormProd = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        packaging: '',
        description: '',
        quantity: '',
        unitCost: '',
        image: '',
        procurement: []
    });
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [procurement, setProcurement] = useState([]);
    useEffect(() => {
        const fetchProcurement = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Procurement/getAll');
                console.log("From fetch");


                setProcurement(response.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchProcurement();
    }, []);
    console.log("procurement");

    console.log(procurement);

    const initialValues = {
        selectedOptions: [],
    };



    useEffect(() => {
        // Fetch data from the backend for editing
        if (id) {
            axios.get(`http://localhost:5000/Production/${id}/getById`).then((response) => {
                setFormData(response.data);
                console.log(response.data);
            });
        }
    }, [id]);


    const handleSubmit = async (event) => {
        console.log("formData");

        console.log(formData);
        if (id) {
            try {
                axios.patch(`http://localhost:5000/Production/${id}/updateProduct`, formData).then((response) => {
                    // Handle successful edit
                    setSnackbarMessage("data edited successfully!");
                });

            } catch (error) {
                console.log(error);
                setSnackbarMessage("Error editing data. Please try again later.");
            }
        } else {
            try {
                const response = await axios.post('http://localhost:5000/Production/addProduct', formData);
                setSnackbarMessage('Production added successfully!');
                console.log(response.data);
            } catch (error) {
                console.log(error);
                setSnackbarMessage('Error adding production. Please try again later.');
            }
        };

    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "procurement") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }
    return (
        <Box m="20px" ml="100px"
        >
            <Snackbar
                open={snackbarMessage !== ''}
                autoHideDuration={6000}
                onClose={() => setSnackbarMessage('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success">{snackbarMessage}</Alert>
            </Snackbar>
            <Header title="CREATE PRODUCT" subtitle="Launch your product" />

            <Formik
                initialValues={initialValues}

                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleBlur, isSubmitting }) => (
                    <form onSubmit={(e) => {
                        e.preventDefault(); // Prevent default form submission behavior
                        handleSubmit();
                    }
                    }
                    >
                        <Box display="flex" flexDirection="column" gap="20px">
                            <TextField
                                name="packaging"
                                label="Packaging"
                                variant="filled"
                                fullWidth
                                value={formData.packaging}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <FormControl variant="filled" fullWidth>
                                <InputLabel>Procurement</InputLabel>
                                <Select
                                    name="procurement"
                                    value={formData.procurement}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    multiple
                                >
                                    {procurement.map((procurement) => (
                                        <MenuItem key={procurement._id} value={procurement._id}>
                                            {procurement.productName}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>

                            <TextField
                                name="description"
                                label="Description"
                                variant="filled"
                                fullWidth
                                multiline
                                minRows={4}
                                value={formData.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <TextField
                                name="quantity"
                                label="Quantity"
                                variant="filled"
                                fullWidth
                                type="number"
                                value={formData.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <TextField fullwidth
                                variant="filled"
                                type="number"
                                label="Unit Cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.unitCost}
                                name="unitCost"
                                required
                                sx={{ gridColumn: "span 2" }}
                                color="secondary"
                            />

                            <TextField fullwidth
                                variant="filled"
                                type="text"
                                label="Image"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formData.image}
                                name="image"
                                required
                                sx={{ gridColumn: "span 4" }}
                                color="secondary"
                            />

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
export default FormProd;





