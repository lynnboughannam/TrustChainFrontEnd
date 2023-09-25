import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { tokens } from "../theme";
import { geoFeatures } from "../data/mockGeoFeature";
import { mockGeographyData as data } from "../data/mockData";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeographyChart = ({ isDashboard = false, isExport = false, onCountryClick }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Export/getAll');
                console.log("From countryyy modified data");

                const modifiedData = response.data.map(item => ({
                    value: item.totalCost,
                    id: item.countryId
                }));
                console.log(modifiedData);

                setChartData(modifiedData);

            } catch (error) {
                console.log(error);
            }
        };
        fetchCountry();
    }, []);
    return (

        <ResponsiveChoropleth

            data={chartData}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.yellow[900]
                        }
                    },
                    legend: {
                        text: {
                            fill: colors.black[900]
                        }
                    },
                    ticks: {
                        line: {
                            stroke: colors.yellow[900],
                            strokeWidth: 1,
                        },

                        text: {
                            fill: colors.black[900]
                        }

                    }


                },
                legends: {
                    text: {
                        fill: colors.black[900]

                    }
                },


                tooltip: {


                    container: {
                        background: colors.yellow[300],
                        color: colors.black[900]

                    },

                },

            }}
            features={geoFeatures.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="YlOrBr"
            domain={[0, 1000000]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            //projectionScale={isDashboard ? 40 : 150}
            projectionScale={isDashboard ? 40 : (isExport ? 50 : 150)}

            projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}

            projectionRotation={[0, 0, 0]}
            enableGraticule={false}
            borderWidth={1.5}



            legends={
                !isDashboard && !isExport
                    ? [
                        {
                            anchor: "bottom-left",
                            direction: "column",
                            justify: true,
                            translateX: 20,
                            translateY: -100,
                            itemsSpacing: 0,
                            itemWidth: 94,
                            itemHeight: 18,
                            itemDirection: "left-to-right",
                            itemTextColor: colors.yellow[100],
                            itemOpacity: 0.85,
                            symbolSize: 18,
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemTextColor: colors.black[900],
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]
                    : undefined
            }
            onClick={feature => {
                if (onCountryClick) {
                    const countryId = feature.id;
                    const countryData = chartData.find(data => data.id === countryId);
                    const countryLabel = countryData ? `${feature.properties.name}` : feature.properties.name;
                    onCountryClick(countryLabel, countryId);
                }
            }}


        />
    )
}

export default GeographyChart;