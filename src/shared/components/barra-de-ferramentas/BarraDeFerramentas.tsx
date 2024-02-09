import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from "@mui/material"

export const BarraDeFerramentas = () => {

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
            <TextField 
                size='small'
                placeholder='Pesquisar...'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Icon>search</Icon>
                        </InputAdornment>
                    )
                }}
            />
            <Button
                variant="contained"
                color="primary"
                disableElevation
                endIcon={<Icon>add</Icon>}
            >Novo</Button>
        </Box>
    )
}