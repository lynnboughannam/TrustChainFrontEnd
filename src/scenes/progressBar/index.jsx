import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme"
import { styled } from "@mui/system";
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";





const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },

    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: value < 50 ? '#f44336' : '#4caf50', // change color based on value
        //transition: 'width 2s ease-in',

    },
}));

const ProgressBar = (props) => {
    const theme = useTheme();

    const [isMounted, setIsMounted] = useState(false);

    const colors = tokens(theme.palette.mode)

    useEffect(() => {
        setIsMounted(true);
    }, []);
    const progress = (props.value / 1000) * 100; // calculate progress as a percentage

    return (
        <Box


            width="200px"


        >
            <CSSTransition
                in={isMounted}
                timeout={500}
                classNames="progress"
                unmountOnExit>

                <BorderLinearProgress variant="determinate" value={progress}

                    sx={{
                        '&.progress-bar':
                            { transition: 'width 2s ease-in-out', },

                        '&.progress-enter': {
                            width: '0%',
                        },
                        '&.progress-enter-active': {
                            width: '100%',
                        },
                        '&.progress-exit': {
                            width: '100%',
                        },
                        '&.progress-exit-active': {
                            width: '0%',
                        },
                    }}
                />

            </CSSTransition>
        </Box >
    );
}

export default ProgressBar;