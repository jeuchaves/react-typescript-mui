import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { LinearProgress } from "@mui/material";

export const DetalheDePessoas: React.FC = () => {
    
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        console.log('Salvar')
    }

    const handleDelete = () => {
        if (window.confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    alert('Registro apagado com sucesso.')
                    navigate('/pessoas');
                })
        }
    }

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                        return;
                    }
                    setNome(result.nomeCompleto);
                    console.log(result);
                })
        }
    }, [id, navigate])
    
    return (
        <LayoutBaseDePagina 
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Nova"    
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoNovo={id !== 'nova'}

                    aoClicarEmSalvar={handleSave}
                    aoClicarEmSalvarEFechar={handleSave}
                    aoClicarEmApagar={handleDelete}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >
            {isLoading && (
                <LinearProgress variant="indeterminate"/>
            )}

        </LayoutBaseDePagina>
    )
}