import { useSearchParams } from "react-router-dom"
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react";
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { Box, Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { Environment } from "../../shared/environment";

export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);
        debounce(() => {
            PessoasService.getAll(1, busca)
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
    }, [busca, debounce])

    return (
        <LayoutBaseDePagina
            titulo="Listagem de pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    textoBotaoNovo="Nova"
                    mostrarInputBusca
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        >
            <Box margin={1}>
                <TableContainer component={Paper} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ações</TableCell>
                                <TableCell>Nome completo</TableCell>
                                <TableCell>E-mail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <IconButton><Icon>delete</Icon></IconButton>
                                        <IconButton><Icon>edit</Icon></IconButton>
                                    </TableCell>
                                    <TableCell>{row.nomeCompleto}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <LinearProgress variant="indeterminate" />
                                    </TableCell>
                                </TableRow>
                            )}
                            {(!isLoading && totalCount <= 0) && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Typography>{Environment.LISTAGEM_VAZIA}</Typography>
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