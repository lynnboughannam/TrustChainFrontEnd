import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Warehouse/getAll');

                const data = response.data; // Assuming the response data is in the expected format

                const groupedData = data.reduce((result, item) => {
                    const { manufacturer, category, usage } = item;
                    const categoryKey = `${category.toLowerCase()}`;

                    const existingManufacturer = result.find((entry) => entry.manufacturer === manufacturer);

                    if (existingManufacturer) {
                        existingManufacturer[categoryKey] = (existingManufacturer[categoryKey] || 0) + usage;
                    } else {
                        const newManufacturer = {
                            manufacturer,
                            [categoryKey]: usage,
                        };
                        result.push(newManufacturer);
                    }

                    return result;
                }, []);

                const transformedData = groupedData.map((item, index) => {
                    const manufacturerData = {
                        manufacturer: item.manufacturer,
                        ...item,
                    };

                    Object.keys(item).forEach((key) => {
                        if (key !== 'manufacturer') {
                            manufacturerData[`${key}Color`] = colors[index % colors.length];
                        }
                    });

                    return manufacturerData;
                });

                setChartData(transformedData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <ResponsiveBar
            data={chartData}
            keys={['hair care', 'sun care', 'skin care', 'body care']}
            indexBy="manufacturer"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            //colors={colors}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: colors.darkbrown[300],
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: { id: 'usage' },
                    id: 'dots',
                },
            ]}
            borderColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'Manufacturer',
                legendPosition: 'middle',
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'Usage',
                legendPosition: 'middle',
                legendOffset: -40,
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) => `${e.id}: ${e.value} in manufacturer: ${e.indexValue}`}
        />
    );
};

export default BarChart;
