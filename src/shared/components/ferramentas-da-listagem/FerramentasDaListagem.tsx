import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from "@mui/material"
import { Environment } from "../../environment";

interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}
export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = '',
    mostrarInputBusca = false,
    aoMudarTextoDeBusca,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    aoClicarEmNovo
}) => {

    const theme = useTheme();

    return (
        <Box
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            component={Paper}
        >
            {mostrarInputBusca && (
                <TextField
                    size='small'
                    placeholder={Environment.INPUT_DE_BUSCA}
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon>search</Icon>
                            </InputAdornment>
                        )
                    }}
                />
            )}
            {mostrarBotaoNovo && (
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={aoClicarEmNovo}
                    endIcon={<Icon>add</Icon>}
                >{textoBotaoNovo}</Button>
            )}
        </Box>
    )
}