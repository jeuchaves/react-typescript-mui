import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from "../pages";

export const AppRoutes = () => {

    const { setDrawerOptions } = useAppDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: 'Home',
                icon: 'home',
                path: '/home'
            },
            {
                label: 'Pessoas',
                icon: 'people',
                path: '/pessoas'
            }
        ]);
    },[setDrawerOptions])

    return (
        <Routes>
            <Route path="/home" element={<Dashboard/>}/>
            <Route path="/pessoas" element={<ListagemDePessoas/>}/>
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas/>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    );
}