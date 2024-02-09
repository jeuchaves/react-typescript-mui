import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const Dashboard = () => {
    return (
        <LayoutBaseDePagina 
            titulo="Home" 
            barraDeFerramentas={(
                <FerramentasDaListagem
                    mostrarInputBusca
                />
            )}
        >Testando</LayoutBaseDePagina>
        
    )
}