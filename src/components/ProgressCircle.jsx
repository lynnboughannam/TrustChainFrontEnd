import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress, size = "75" }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const angle = ((progress) / 1000) * 360;
    return (
        <Box
            sx={{
                position: "relative",
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    background: `radial-gradient(${colors.black[400]} 55%, transparent 56%),
                                conic-gradient(transparent 0deg ${angle}deg, ${colors.yellow[200]} ${angle}deg 360deg),
                                ${colors.yellow[500]}`,
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                }}
            />
            <Typography
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: colors.yellow[400],
                    fontWeight: "bold",
                    fontSize: "20px",
                }}
            >
                {(progress * 100) / 1000}%
            </Typography>
        </Box>
    );
};

export default ProgressCircle;
