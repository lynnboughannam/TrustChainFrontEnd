import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Grid, Paper } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";

import axios from "axios";

const Products = (props) => {

    // const { id } = props;
    const id = useOutletContext();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    const handleEdit = (_id) => {
        setSelectedRowId(_id);
        navigate(`/production/formProd/${_id}`);
        id(_id);
    };


    useEffect(() => {
        axios.get("http://localhost:5000/Production/getAll")
            .then(response => {
                const data = response.data;
                console.log(response.data); // check if dataRows is correct

                setProducts(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []); // add rows state as a dependency

    const handleDelete = (productId) => {
        //  console.log(params.row._id);
        console.log(products._id);
        axios.delete(`http://localhost:5000/Production/${productId}/deleteProduct`)

            .then((response) => {
                console.log(response.data);
                setProducts(products.filter((product) => product._id !== productId));
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Box m="20px" ml="120px">
            <Header title="Products" subtitle="Managing products " />

            {products.length === 0 ? (
                <Typography variant="h4" align="center" mt={4}>
                    No products available.
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} md={3} lg={3}>
                            <Paper style={{ backgroundColor: colors.yellow[400] }}>

                                <Box p={2}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        height={120}
                                        width="100%"
                                        mb={2}
                                        bgcolor={colors.yellow[200]}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            height={120}
                                            width="100%"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </Box>
                                    <Typography variant="h5" gutterBottom>
                                        Packaging: {product.packaging}
                                    </Typography>
                                    <Box display="flex" alignItems="center">
                                        {/* <Typography variant="body2" component="span" mr={1}>

                                    </Typography> */}
                                        <Typography variant="body2" component="span" mr={2}>
                                            Unit Cost: ${product.unitCost}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {product.description}
                                    </Typography>

                                    <Box display="flex" justifyContent="flex-end" mt={2}>
                                        <Box mr={2}>
                                            <Button variant="outlined" color="secondary" size="small" onClick={() => handleEdit(product._id)}>
                                                Edit
                                            </Button>
                                        </Box>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleDelete(product._id)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default Products;
