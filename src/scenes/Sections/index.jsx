import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Grid, Paper } from "@mui/material";
import axios from "axios";

const Sections = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [sectionData, setSectionData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/Warehouse/getAll")
            .then((response) => {
                const groupedData = response.data.reduce((acc, cur) => {
                    if (acc[cur.section]) {
                        acc[cur.section].category.push(cur.category);
                        acc[cur.section].usage.push(cur.usage);
                        acc[cur.section].usageSum += cur.usage;
                    } else {
                        acc[cur.section] = {
                            category: [cur.category],
                            usage: [cur.usage],
                            usageSum: cur.usage,
                        };
                    }
                    return acc;
                }, {});
                setSectionData(groupedData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Box m="20px" ml="120px">
            <Header title="Sections" subtitle="Managing Sections " />
            <Grid container spacing={2}>
                {Object.entries(sectionData).map(([section, data]) => (
                    <Grid item key={section} xs={12} md={3} lg={3}>
                        <StatBox
                            title={section}
                            progress={data.usageSum}
                        // subtitle={data.category}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Sections;
