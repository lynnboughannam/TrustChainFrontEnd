import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
//import EmailIcon from "@mui/icons-material/Email";
//import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
//import PersonAddIcon from "@mui/icons-material/PersonAdd";
//import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
//import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import PieChart from "../../components/PieChart";
import Sidebar from "../global/sideBar";
import TopBar from "../global/topBar";
import { useGridRowSelection } from "@mui/x-data-grid/internals";
import StatBox from "../../components/StatBox";
import html2pdf from 'html2pdf.js';
const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleDownload = () => {
        const element = document.documentElement;

        // Configure the PDF options
        const options = {
            margin: [10, 10, 10, 10], // Margins: top, left, bottom, right
            filename: 'page.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        // Generate the PDF
        html2pdf().set(options).from(element).save();
    };


    return (

        <Box>

            <Box m="20px" ml="120px">
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                    <Box>
                        <Button
                            sx={{
                                backgroundColor: colors.yellow[700],
                                color: colors.yellow[200],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                            onClick={handleDownload}
                        >
                            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                            Download Reports
                        </Button>
                    </Box>
                </Box>

                {/* GRID & CHARTS */}
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                >

                    {/* ROW 2 */}
                    <Box
                        gridColumn="span 12"
                        gridRow="span 2"
                        backgroundColor={colors.black[400]}
                        borderRadius="7px"
                    >
                        <Box
                            mt="25px"
                            p="0 30px"
                            display="flex "
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography
                                    variant="h5"
                                    fontWeight="600"
                                    color={colors.yellow[200]}
                                >
                                    Revenue Generated
                                </Typography>
                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    color={colors.yellow[500]}
                                >
                                    $59,342.32
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton>
                                    <DownloadOutlinedIcon
                                        sx={{ fontSize: "26px", color: colors.yellow[500] }}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box height="250px" m="-20px 0 0 0">
                            <BarChart isDashboard={true} />
                        </Box>
                    </Box>
                    {/* 
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.black[400]}
                        overflow="auto"
                        borderRadius="7px"

                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.black[500]}`}
                            colors={colors.yellow[200]}
                            p="15px"
                        >
                            <Typography color={colors.yellow[400]} variant="h5" fontWeight="600">
                                Recent Transactions
                            </Typography>
                        </Box>
                        {mockTransactions.map((transaction, i) => (
                            <Box
                                key={`${transaction.txId}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.black[500]}`}
                                p="15px"
                            >
                                <Box>
                                    <Typography
                                        color={colors.yellow[500]}
                                        variant="h5"
                                        fontWeight="600"
                                    >
                                        {transaction.txId}
                                    </Typography>
                                    <Typography color={colors.yellow[200]}>
                                        {transaction.user}
                                    </Typography>
                                </Box>
                                <Box color={colors.yellow[200]}>{transaction.date}</Box>
                                <Box
                                    backgroundColor={colors.yellow[500]}
                                    p="5px 10px"
                                    borderRadius="4px"
                                >
                                    ${transaction.cost}
                                </Box>
                            </Box>
                        ))}
                    </Box>
*/}
                    {/* ROW 3 */}
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.black[400]}
                        p="30px"
                        borderRadius="7px"

                    >
                        <Typography variant="h5" fontWeight="600">
                            Campaign
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            mt="25px"
                        >
                            {/* <ProgressCircle size="125" /> */}
                            <ProgressCircle progress={300} size="125" />
                            <Typography
                                variant="h5"
                                color={colors.yellow[500]}
                                sx={{ mt: "15px" }}
                            >
                                $48,352 revenue generated
                            </Typography>
                            <Typography>Includes extra misc expenditures and costs</Typography>
                        </Box>
                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.black[400]}
                        borderRadius="7px"

                    >
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{ padding: "30px 30px 0 30px" }}
                        >
                            Sales Quantity
                        </Typography>
                        <Box height="250px" mt="-20px">
                            <PieChart isDashboard={true} />
                        </Box>
                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.black[400]}
                        padding="30px"
                        borderRadius="7px"

                    >
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{ marginBottom: "15px" }}
                        >
                            Geography Based Traffic
                        </Typography>
                        <Box height="200px"

                        >
                            <GeographyChart isDashboard={true} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;