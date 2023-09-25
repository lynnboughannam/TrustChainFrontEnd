import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Snackbar, Typography, Grid, FormHelperText, useTheme, Alert, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import GeographyChart from '../../components/GeographyChart';
import Header from "../../components/Header";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useParams } from 'react-router-dom';


import { tokens } from '../../theme';
import { LegendToggleRounded } from '@mui/icons-material';
const productionSchema = yup.object().shape({
    productionId: yup.string().required('Production is required'),
    packaging: yup.string().required('Packaging is required').min(3, 'Packaging must be at least 3 characters').max(255, 'Packaging must be at most 255 characters'),
    quantity: yup.string().required('quantity is required').min(10, 'quantity must be at least 10 characters').max(2000, 'quantity must be at most 2000 characters'),
    quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number').integer('Quantity must be an integer'),
    unitCost: yup.number().required('Unit cost is required').min(0, 'Unit cost must be at least 0'),
    image: yup.string().required('Image is required')
});

const FormExport = () => {

    const { id } = useParams();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [formData, setFormData] = useState({
        // productionId: '',
        packaging: '',
        quantity: '',
        totalCost: '',
        exportType: '',
        country: '',
        countryId: '',
    });
    const [selectedCountry, setSelectedCountry] = useState('');
    const [shipmentMethod, setShipmentMethod] = useState('');
    const [selectedProduction, setSelectedProduction] = useState(null);

    const [totalcost, setTotalcost] = useState(null);

    const [quantity, setQuantity] = useState('');
    const [unitCost, setUnitCost] = useState(0);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [productions, setProductions] = useState([]);

    const handlePackagingSelect = () => {
        const selectedProd = productions.find((prod) => prod._id === formData.packaging);
        if (selectedProd) {

            const newTotalCost = selectedProd.unitCost * formData.quantity * selectedProd.quantity;
            setTotalcost(newTotalCost);
            setFormData((prevFormData) => ({
                ...prevFormData,
                totalCost: newTotalCost.toFixed(2),
            }));
        }
    };


    useEffect(() => {
        // Fetch data from the backend for editing
        if (id) {
            axios.get(`http://localhost:5000/Export/${id}/getById`).then((response) => {
                setFormData(response.data);
                console.log(response.data);
            });
        }
    }, [id]);
    const handleShipmentMethodSelect = (method) => {
        setShipmentMethod(method);
        setFormData({
            ...formData,
            exportType: method,
        });
    };

    useEffect(() => {
        const fetchProductions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Production/getAll');
                console.log("From fetch");

                const getQuantity = response.data.map(row => row.quantity);
                console.log(getQuantity);

                setProductions(response.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchProductions();
    }, []);
    console.log("productions");

    console.log(productions);


    const handleCountryClick = (country, countryId) => {
        console.log("country");

        console.log(country);
        console.log(countryId);

        setSelectedCountry(country);
        setFormData({
            ...formData,
            country: country,
            countryId: countryId,

        });
    };


    // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(formData);
        //setSubmitting(true);
        try {
            const response = await axios.post('http://localhost:5000/Export/addProduct', formData);
            setSnackbarMessage('Product added successfully!');
            console.log(response.data);
            //  resetForm();
        } catch (error) {
            console.log(error);
            setSnackbarMessage('Error adding product. Please try again later.');
        }
        //   setSubmitting(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'quantity') {
            const newQuantity = parseInt(value, 10);
            const newTotalCost = selectedProduction ? selectedProduction.unitCost * newQuantity : 0;
            setQuantity(newQuantity);
            setFormData((prevFormData) => ({
                ...prevFormData,
                quantity: newQuantity,
                totalCost: newTotalCost.toFixed(2),
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,

            });
        }
    };


    console.log(formData);


    return (

        <Box m="20px" ml="100px"
        >
            <Snackbar
                open={snackbarMessage !== ""}
                autoHideDuration={6000}
                onClose={() => setSnackbarMessage("")}
                message={snackbarMessage}
            >
                <Alert >{snackbarMessage}</Alert>

            </Snackbar>
            <Header title="Export Form" subtitle="Launch your Packages!" />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box p={2}>
                        <Formik
                            initialValues={formData}
                            validationSchema={productionSchema}
                            onSubmit={handleSubmit}

                        >
                            {({ values, errors, touched, handleBlur }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box display="flex" flexDirection="column" gap="20px">
                                        <FormControl variant="filled" fullWidth>
                                            <InputLabel>Production</InputLabel>
                                            <Select
                                                name="packaging"
                                                value={formData.packaging}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                            >
                                                {productions.map((production) => (
                                                    <MenuItem key={production._id} value={production._id}>
                                                        {production.packaging} | {production.unitCost * production.quantity}$ /package
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                        </FormControl>


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
                                            onSelect={(event) => handlePackagingSelect()}

                                        />

                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="number"
                                            label="Total Cost"
                                            value={formData.totalCost}
                                            name="totalCost"
                                            sx={{ gridColumn: "span 2" }}
                                            color="secondary"
                                            disabled

                                        />

                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Country"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={formData.country}
                                            name="country"
                                            required
                                            sx={{ gridColumn: "span 4" }}
                                            color="secondary"

                                        />


                                        <TextField
                                            fullwidth
                                            variant="filled"
                                            label="Shipment Method"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={formData.exportType}
                                            name="shipmentMethod"
                                            required
                                            sx={{ gridColumn: "span 4" }}
                                            color="secondary"
                                            disabled
                                        />

                                    </Box>
                                    <Box>

                                        <Box display="flex" gap="10px">
                                            <Button
                                                variant={shipmentMethod === 'plane' ? 'contained' : 'outlined'}
                                                onClick={() => handleShipmentMethodSelect('plane')}
                                                style={{ backgroundColor: shipmentMethod === 'plane' ? colors.yellow[700] : 'transparent', color: shipmentMethod === 'plane' ? '#ffffff' : colors.brown[500] }}
                                            >
                                                <AirplanemodeActiveIcon />
                                            </Button>

                                            <Button
                                                variant={shipmentMethod === 'ship' ? 'contained' : 'outlined'}
                                                onClick={() => handleShipmentMethodSelect('ship')}
                                                style={{ backgroundColor: shipmentMethod === 'ship' ? '#00008B' : 'transparent', color: shipmentMethod === 'ship' ? '#ffffff' : '#00008B' }}
                                            >
                                                <DirectionsBoatIcon />
                                            </Button>

                                            <Button
                                                variant={shipmentMethod === 'truck' ? 'contained' : 'outlined'}
                                                onClick={() => handleShipmentMethodSelect('truck')}
                                                style={{ backgroundColor: shipmentMethod === 'truck' ? '#4caf50' : 'transparent', color: shipmentMethod === 'truck' ? '#ffffff' : '#4caf50' }}
                                            >
                                                <LocalShippingIcon />
                                            </Button>
                                        </Box>
                                    </Box>

                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <Button type="submit" color="secondary" variant="contained">
                                            Export!
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>

                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box p={5} height="400px">
                        <Typography align='center'>
                            Click on the country you want to export to
                        </Typography>
                        <GeographyChart isExport={true} onCountryClick={handleCountryClick} />

                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

}

export default FormExport;

