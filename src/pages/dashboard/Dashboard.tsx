import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useEffect, useState } from 'react';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const Dashboard = () => {
    const [isLoadingCidades, setIsLoadingCidades] = useState(true);
    const [totalCountCidades, setTotalCountCidades] = useState<number>(0);

    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [totalCountPessoas, setTotalCountPessoas] = useState<number>(0);

    useEffect(() => {
        setIsLoadingCidades(true);
        setIsLoadingPessoas(true);
        CidadesService.getAll(1).then((result) => {
            setIsLoadingCidades(false);

            if (result instanceof Error) {
                alert(result.message);
                return;
            }
            setTotalCountCidades(result.totalCount);
        });
        PessoasService.getAll(1).then((result) => {
            setIsLoadingPessoas(false);

            if (result instanceof Error) {
                alert(result.message);
                return;
            }
            setTotalCountPessoas(result.totalCount);
        });
    }, []);

    return (
        <LayoutBaseDePagina titulo="Home">
            <Box width="100%" display="flex">
                <Grid container margin={1}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        TOTAL DE CIDADES
                                    </Typography>

                                    {isLoadingCidades ? (
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            Carregando...
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            {totalCountCidades}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        TOTAL DE PESSOAS
                                    </Typography>
                                    {isLoadingPessoas ? (
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            Carregando...
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            {totalCountPessoas}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBaseDePagina>
    );
};
