import { useNavigate, useSearchParams } from "react-router-dom"
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react";
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { Box, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../shared/environment";

export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);
        debounce(() => {
            PessoasService.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    setRows(result.data);
                    setTotalCount(result.totalCount);
                });
        });
    }, [busca, debounce, pagina]);

    const handleDelete = (id: number) => {
        if (window.confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(id)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    setRows(oldRows => {
                        return [
                            ...oldRows.filter(oldRow => oldRow.id !== id)
                        ]
                    })
                    alert('Registro apagado com sucesso.')
                })
        }
    }

    return (
        <LayoutBaseDePagina
            titulo="Listagem de pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    textoBotaoNovo="Nova"
                    mostrarInputBusca
                    textoDaBusca={busca}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }
        >
            <Box margin={1}>
                <TableContainer component={Paper} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome completo</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell width={100}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.nomeCompleto}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>
                                        <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}><Icon>edit</Icon></IconButton>
                                        <IconButton size="small" onClick={() => handleDelete(row.id)}><Icon>delete</Icon></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        {(!isLoading && totalCount <= 0) && (
                            <caption>{Environment.LISTAGEM_VAZIA}</caption>
                        )}

                        <TableFooter>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <LinearProgress variant="indeterminate" />
                                    </TableCell>
                                </TableRow>
                            )}
                            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Pagination
                                            page={pagina}
                                            count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                            color="primary"
                                            onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>
        </LayoutBaseDePagina>
    )
}