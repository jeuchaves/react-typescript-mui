import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material"

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;

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
            {mostrarBotaoSalvar && (
                <Button
                    variant='contained'
                    color="primary"
                    disableElevation
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarEmSalvar}
                >Salvar</Button>
            )}
            {mostrarBotaoSalvarEFechar && (
                <Button
                    variant='outlined'
                    color="primary"
                    disableElevation
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarEmSalvarEFechar}
                >Salvar e Voltar</Button>
            )}
            {mostrarBotaoApagar && (
                <Button
                    variant='outlined'
                    color="primary"
                    disableElevation
                    startIcon={<Icon>delete</Icon>}
                    onClick={aoClicarEmApagar}
                >Apagar</Button>
            )}
            {mostrarBotaoNovo && (
                <Button
                    variant='outlined'
                    color="primary"
                    disableElevation
                    startIcon={<Icon>add</Icon>}
                    onClick={aoClicarEmNovo}
                >{textoBotaoNovo}</Button>
            )}
            <Divider variant="middle" orientation="vertical" />
            {mostrarBotaoVoltar && (
                <Button
                    variant='outlined'
                    color="primary"
                    disableElevation
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={aoClicarEmVoltar}
                >Voltar</Button>
            )}
        </Box>
    )
}