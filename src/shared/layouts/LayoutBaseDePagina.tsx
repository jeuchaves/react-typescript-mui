import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useAppDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
    titulo: string;
    barraDeFerramentas?: React.ReactNode;
    children: React.ReactNode;
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ titulo, children, barraDeFerramentas }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));


    const { toggleDrawerOpen } = useAppDrawerContext();
    return (
        <Box height='100%' display='flex' flexDirection='column' gap={1}>
            <Box display='flex' padding={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} alignItems='center' gap={1}>
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}
                <Typography
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'
                    variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'} 
                >{titulo}</Typography>
            </Box>
            {barraDeFerramentas && (
                <Box>
                    {barraDeFerramentas}
                </Box>
            )}
            <Box flex={1} overflow='auto'>
                {children}
            </Box>

        </Box>
    )
}