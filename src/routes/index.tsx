import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

export const AppRoutes = () => {

    const { toggleDrawerOpen, setDrawerOptions } = useAppDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: 'Home',
                icon: 'home',
                path: '/home'
            }
        ]);
    },[setDrawerOptions])

    return (
        <Routes>
            <Route path="/home" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Expandir menu</Button>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    );
}