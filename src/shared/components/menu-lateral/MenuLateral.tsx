import React from "react";

import {
	Avatar,
	Divider,
	Drawer,
	Icon,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAppDrawerContext } from "../../contexts/DrawerContext";

type Props = {
	children: React.ReactNode;
};

export const MenuLateral: React.FC<Props> = ({ children }) => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'))

	const { isDrawerOpen, toggleDrawerOpen } = useAppDrawerContext();

	return (
		<>
			<Drawer open={isDrawerOpen} variant={smDown ? 'temporary':'permanent'} onClose={toggleDrawerOpen} >
				<Box width={theme.spacing(28)} display='flex' flexDirection='column' height='100%'>
					<Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
						<Avatar
							sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
							alt='avatar'
							src='https://avatars.githubusercontent.com/u/33734503?v=4'
						/>
					</Box>

					<Divider />
					<Box flex={1}>
						<List component='nav'>
							<ListItemButton>
								<ListItemIcon>
									<Icon>home</Icon>
								</ListItemIcon>
								<ListItemText primary='Pagina Inicial' />
							</ListItemButton>
						</List>
					</Box>
				</Box>
			</Drawer>
			<Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
				{children}
			</Box>
		</>
	);
};
