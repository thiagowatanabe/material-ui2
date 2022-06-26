import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDrawerContext } from "../contexts";

interface ILayoutBaseDePagina {
	children?: React.ReactNode;
	titulo: string;
    barraDeFerramenta?: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePagina> = ({ children, titulo, barraDeFerramenta }) => {
    const smDown = useMediaQuery((theme:Theme) => theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery((theme:Theme) => theme.breakpoints.down("md"));
    const theme = useTheme();
    const { toggleDrawerOpen } = useAppDrawerContext();
    

	return (
		<Box height='100vh' display='flex' flexDirection='column' gap={1}>
			<Box padding={1} display='flex' alignItems='center' height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} gap={1}>
               {smDown && (
                <IconButton onClick={toggleDrawerOpen}>
                    <Icon>menu</Icon>
                </IconButton>
               )} 
                
                <Typography  whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' 
                    variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}>
                {titulo}
                </Typography>
                </Box>

			{barraDeFerramenta && (<Box>
                {barraDeFerramenta}
            </Box>)}

			<Box flex={1} overflow='auto'>{children}</Box>
		</Box>
	);
};
