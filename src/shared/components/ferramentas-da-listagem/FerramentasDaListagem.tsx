import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import React from "react";

interface IFerramentasDaListagemProps {
	textoDaBusca?: string;
	mostrarInputBusca?: boolean;
	aoMudarTextoDeBusca?: (novoTexto: string) => void;

	textoBotaoNovo?: string;
	mostrarBotaoNovo?: boolean;
	aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
	textoDaBusca = "",
	mostrarInputBusca = false,
	aoMudarTextoDeBusca,
	textoBotaoNovo = "Novo",
	mostrarBotaoNovo = true,
	aoClicarEmNovo,
}) => {
	const theme = useTheme();
	return (
		<Box
			gap={1}
			marginX={1}
			padding={1}
			paddingX={2}
			display='flex'
			alignItems='center'
			height={theme.spacing(5)}
			component={Paper}
		>
			{mostrarInputBusca && (
				<TextField
					size='small'
					placeholder='Pesquisar...'
					value={textoDaBusca}
					onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
				/>
			)}

			<Box flex={1} display='flex' justifyContent='end'>
				{mostrarBotaoNovo && (
					<Button onClick={aoClicarEmNovo} color='primary' disableElevation variant='contained' endIcon={<Icon>add</Icon>}>
						{textoBotaoNovo}
					</Button>
				)}
			</Box>
		</Box>
	);
};
