import { Box, ThemeProvider } from "@mui/material";
import { LightTheme, DarkTheme } from "./../themes";
import { useCallback, useContext, useMemo, useState, createContext } from "react";

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}
const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

interface IThemeProviderProps {
    children: React.ReactNode
}
export const AppThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {

    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light') return LightTheme;
        return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}