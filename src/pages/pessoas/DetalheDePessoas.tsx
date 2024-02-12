import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Form } from "@unform/web";

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { VtexField } from "../../shared/forms";
import { FormHandles } from "@unform/core";

interface IFormData {
    email: string;
    nomeCompleto: string;
    cidadeId: number;
}

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [nome, setNome] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);
        if (id === 'nova') {
            PessoasService
                .create(dados)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    navigate(`/pessoas/detalhe/${result}`);
                });
        } else {
            PessoasService
                .updateById(Number(id), { id: Number(id), ...dados })
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                });
        }
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
            PessoasService
                .getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                        return;
                    }
                    setNome(result.nomeCompleto);
                    formRef.current?.setData(result);
                })
        }
    }, [id, navigate]);

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoNovo={id !== 'nova'}

                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
                    aoClicarEmApagar={handleDelete}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >

            {isLoading && (
                <p>Carregando</p>
            )}

            <Form ref={formRef} onSubmit={handleSave} placeholder=''>
                <VtexField placeholder="Nome completo" name="nomeCompleto" />
                <VtexField placeholder="E-mail" name="email" />
                <VtexField placeholder="Cidade ID" name="cidadeId" />
            </Form>

        </LayoutBaseDePagina>
    )
}