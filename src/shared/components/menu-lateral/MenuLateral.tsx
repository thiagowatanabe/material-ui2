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
import { useNavigate, useResolvedPath, useMatch } from "react-router-dom";
import { useAppThemeContext } from "../../contexts";

type Props = {
	children: React.ReactNode;
};

interface IListItemLinkProps {
	label: string;
	icon: string;
	to: string;
	onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
	const navigate = useNavigate();

	const resolvedPath = useResolvedPath(to);

	const match = useMatch({ path: resolvedPath.pathname, end: false });

	const handleClick = () => {
		navigate(to);
		onClick?.();
	};

	return (
		<ListItemButton selected={!!match} onClick={handleClick}>
			<ListItemIcon>
				<Icon>{icon}</Icon>
			</ListItemIcon>
			<ListItemText primary={label} />
		</ListItemButton>
	);
};

export const MenuLateral: React.FC<Props> = ({ children }) => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down("sm"));

	const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useAppDrawerContext();
	const { toggleTheme } = useAppThemeContext();

	return (
		<>
			<Drawer open={isDrawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
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
							{drawerOptions.map((drawerOption) => (
								<ListItemLink
									key={drawerOption.path}
									icon={drawerOption.icon}
									label={drawerOption.label}
									to={drawerOption.path}
									onClick={smDown ? toggleDrawerOpen : undefined}
								/>
							))}
						</List>
					</Box>

					<Box>
						<ListItemButton onClick={toggleTheme}>
							<ListItemIcon>
								<Icon>dark_mode</Icon>
							</ListItemIcon>
							<ListItemText primary='Alterar tema' />
						</ListItemButton>
					</Box>
				</Box>
			</Drawer>
			<Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
				{children}
			</Box>
		</>
	);
};
