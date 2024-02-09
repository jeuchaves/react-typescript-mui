import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from "@mui/material"

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEFecharCarregando?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEFechar?: () => void;
}
export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = "Novo",

    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar
}) => {

    const theme = useTheme();

    return (
        <Box
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display='flex'
            gap={1}
            alignItems='center'
            component={Paper}
        >
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
                <Button
                    variant='contained'
                    color="primary"
                    disableElevation
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarEmSalvar}
                >Salvar</Button>
            )}
            {mostrarBotaoSalvarCarregando && (
                <Skeleton width={110} height={60}/>
            )}
            {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando) && (
                <Button
                    variant='outlined'
                    color="primary"
                    disableElevation
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarEmSalvarEFechar}
                >Salvar e Voltar</Button>
            )}
            {mostrarBotaoSalvarEFecharCarregando && (
                <Skeleton width={110} height={60}/>
            )}
            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                <Button
                    variant='outlined'
                    color="primary"
                    disableElevation
                    startIcon={<Icon>delete</Icon>}
                    onClick={aoClicarEmApagar}
                >Apagar</Button>
            )}
            {mostrarBotaoApagarCarregando && (
                <Skeleton width={110} height={60}/>
            )}
            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && (
                <Button
                    variant='outlined'
                    color="primary"
                    disableElevation
                    startIcon={<Icon>add</Icon>}
                    onClick={aoClicarEmNovo}
                >{textoBotaoNovo}</Button>
            )}
            {mostrarBotaoNovoCarregando && (
                <Skeleton width={110} height={60}/>
            )}
            <Divider variant="middle" orientation="vertical" />
            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                    variant='outlined'
                    color="primary"
                    disableElevation
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={aoClicarEmVoltar}
                >Voltar</Button>
            )}
            {mostrarBotaoVoltarCarregando && (
                <Skeleton width={110} height={60}/>
            )}
        </Box>
    )
}