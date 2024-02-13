import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { IVFormErros, VForm, VtexField, useVForm } from '../../shared/forms';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { AutoCompleteCidade } from './components/AutoCompleteCidade';

interface IFormData {
    email: string;
    nomeCompleto: string;
    cidadeId: number;
}
const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.number().required(),
});

export const DetalheDePessoas: React.FC = () => {
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = (dados: IFormData) => {
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true);
                if (id === 'nova') {
                    PessoasService.create(dadosValidados).then((result) => {
                        setIsLoading(false);
                        if (result instanceof Error) {
                            alert(result.message);
                            return;
                        }
                        if (isSaveAndClose()) {
                            navigate('/pessoas');
                        } else {
                            navigate(`/pessoas/detalhe/${result}`);
                        }
                    });
                } else {
                    PessoasService.updateById(Number(id), {
                        id: Number(id),
                        ...dadosValidados,
                    }).then((result) => {
                        setIsLoading(false);
                        if (result instanceof Error) {
                            alert(result.message);
                            return;
                        }
                        if (isSaveAndClose()) {
                            navigate('/pessoas');
                        }
                    });
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErros = {};
                errors.inner.forEach((error) => {
                    if (!error.path) return;
                    validationErrors[error.path] = error.message;
                });
                formRef.current?.setErrors(validationErrors);
            });
    };

    const handleDelete = () => {
        if (window.confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(Number(id)).then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                    return;
                }
                alert('Registro apagado com sucesso.');
                navigate('/pessoas');
            });
        }
    };

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            PessoasService.getById(Number(id)).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/pessoas');
                    return;
                }
                setNome(result.nomeCompleto);
                formRef.current?.setData(result);
            });
        } else {
            formRef.current?.setData({
                nomeCompleto: '',
                email: '',
                cidadeId: undefined,
            });
        }
    }, [id, navigate, formRef]);

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoNovo={id !== 'nova'}
                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmApagar={handleDelete}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >
            <VForm ref={formRef} onSubmit={handleSave} placeholder="">
                <Box
                    margin={1}
                    display="flex"
                    flexDirection="column"
                    component={Paper}
                    variant="outlined"
                >
                    <Grid container direction="column" padding={2} spacing={2}>
                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}
                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VtexField
                                    fullWidth
                                    label="Nome completo"
                                    name="nomeCompleto"
                                    disabled={isLoading}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VtexField
                                    fullWidth
                                    label="E-mail"
                                    name="email"
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <AutoCompleteCidade
                                    isExternalLoading={isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBaseDePagina>
    );
};
