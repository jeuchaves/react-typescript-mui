import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from "../pages";
import { ListagemDeCidades } from "../pages/cidades/ListagemDeCidades";
import { DetalheDeCidades } from "../pages/cidades/DetalheDeCidades";

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
                label: 'Cidades',
                icon: 'location_city',
                path: '/cidades'
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

            <Route path="/cidades" element={<ListagemDeCidades/>}/>
            <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades/>}/>

            <Route path="/pessoas" element={<ListagemDePessoas/>}/>
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas/>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    );
}