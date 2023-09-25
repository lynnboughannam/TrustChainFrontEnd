import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            bgcolor={colors.black[100]}
            borderRadius={4}
            px={2}
            py={1.5}
            width="100%"
        // m="0 30px"
        >
            <Box display="flex" flexDirection="column">
                <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{
                        color: colors.yellow[600],
                    }}
                >
                    Section {title}
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        color: colors.yellow[700],
                    }}
                >
                    {subtitle}
                </Typography>
                <Box>
                    <ProgressCircle progress={progress} />
                </Box>
            </Box>
        </Box>
    );
};

export default StatBox;
