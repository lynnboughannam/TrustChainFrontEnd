
import { ResponsivePie } from "@nivo/pie"
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { tokens } from "../theme";
import { mockPieData as data } from "../data/mockData";

const PieChart = () => {

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
                    id: item.country,
                    label: item.country
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
        <ResponsivePie
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

                    }
                },

            }}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'yellow_orange_brown' }}

            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.black[900]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            enableArcLabels={false}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}

            fill={
                [
                    {
                        match: {
                            id: 'ruby'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'c'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'go'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'python'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'scala'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'lisp'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'elixir'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'javascript'
                        },
                        id: 'lines'
                    }
                ]}
            legends={
                [
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
        />
    )
}

export default PieChart;