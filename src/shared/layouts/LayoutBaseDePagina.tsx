import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useAppDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
    titulo: string;
    children: React.ReactNode;
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ titulo, children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));


    const { toggleDrawerOpen } = useAppDrawerContext();
    return (
        <Box height='100%' display='flex' flexDirection='column' gap={1}>
            <Box display='flex' padding={1} height={theme.spacing(12)} alignItems='center' gap={1}>
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}
                <Typography variant="h5">
                    {titulo}
                </Typography>
            </Box>
            <Box>
                Barra de ferramentas
            </Box>
            <Box>
                {children}
            </Box>

        </Box>
    )
}