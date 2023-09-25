import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            black: {
                100: "#030303",
                200: "#050505",
                300: "#080808",
                400: "#0a0a0a",
                500: "#0d0d0d", //main
                600: "#3d3d3d",
                700: "#6e6e6e",
                800: "#9e9e9e",
                900: "#f2b84b",
            },
            darkbrown: {
                100: "#1c1712",
                200: "#382d23",
                300: "#544435",
                400: "#705a46",
                500: "#8c7158",
                600: "#a38d79",
                700: "#baaa9b",
                800: "#d1c6bc",
                900: "#e8e3de",
            },
            yellow: {
                100: "#30250f",
                200: "#614a1e",
                300: "#916e2d",
                400: "#c2933c",
                500: "#f2b84b",
                600: "#f5c66f",
                700: "#f7d493",
                800: "#fae3b7",
                900: "#fcf1db",
            },
            brown: {
                100: "#1c1201",
                200: "#382501",
                300: "#543702",
                400: "#704a02",
                500: "#8c5c03",
                600: "#a37d35",
                700: "#ba9d68",
                800: "#d1be9a",
                900: "#e8decd",
            },
        }
        : {


            black: {
                100: "#f7d493",
                200: "#9e9e9e",
                300: "#0d0d0d",
                400: "#3d3d3d",
                500: "#0d0d0d", //main
                600: "#0a0a0a",
                700: "#080808",
                800: "#050505",
                900: "#030303"
            },
            darkbrown: {
                100: "#e8e3de",
                200: "#d1c6bc",
                300: "#baaa9b",
                400: "#a38d79",
                500: "#8c7158",
                600: "#705a46",
                700: "#544435",
                800: "#382d23",
                900: "#1c1712"
            },
            yellow: {
                100: "#fcf1db",
                200: "#fae3b7",
                300: "#f7d493",
                400: "#f5c66f",
                500: "#f2b84b",
                600: "#c2933c",
                700: "#916e2d",
                800: "#fae3b7",
                900: "#30250f"
            },
            brown: {
                100: "#e8decd",
                200: "#d1be9a",
                300: "#ba9d68",
                400: "#a37d35",
                500: "#8c5c03",
                600: "#704a02",
                700: "#543702",
                800: "#382501",
                900: "#1c1201"
            },

        }),
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        main: colors.black[500],
                    },
                    secondary: {
                        main: colors.yellow[500],
                    },
                    neutral: {
                        dark: colors.brown[700],
                        main: colors.brown[500],
                        light: colors.brown[100],
                    },
                    background: {
                        default: colors.black[500],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: colors.yellow[500],
                    },
                    secondary: {
                        main: colors.darkbrown[600],
                    },
                    neutral: {
                        dark: colors.brown[700],
                        main: colors.brown[500],
                        light: colors.brown[100],
                    },
                    background: {
                        default: colors.yellow[500],
                    },
                }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode


export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};