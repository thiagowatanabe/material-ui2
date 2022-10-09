import { Box, Button, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";

interface IFerramentasDaDetalheProps {
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

aoClicarEmNovo?: () => void,
aoClicarEmVoltar?: () => void,
aoClicarEmApagar?: () => void,
aoClicarEmSalvar?: () => void,
aoClicarEmSalvarEFechar?: () => void,
}

export const FerramentasDeDetalhes: React.FC<IFerramentasDaDetalheProps> = ({
textoBotaoNovo ='Novo',
mostrarBotaoNovo=true,
mostrarBotaoVoltar=true,
mostrarBotaoApagar=true,
mostrarBotaoSalvar=true,
mostrarBotaoSalvarEFechar=false,

mostrarBotaoNovoCarregando=false,
mostrarBotaoVoltarCarregando=false,
mostrarBotaoApagarCarregando=false,
mostrarBotaoSalvarCarregando=false,
mostrarBotaoSalvarEFecharCarregando=false,

aoClicarEmNovo,
aoClicarEmVoltar,
aoClicarEmApagar,
aoClicarEmSalvar,
aoClicarEmSalvarEFechar,

}) => {

	const smDown = useMediaQuery((theme:Theme) => theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery((theme:Theme) => theme.breakpoints.down("md"));
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
			{(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (<Button onClick={aoClicarEmSalvar} color='primary' disableElevation variant='outlined' startIcon={<Icon>save</Icon>}>
				<Typography variant='button' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' >
				Salvar
				</Typography>
			</Button>
			)
			}

{mostrarBotaoSalvarCarregando && (<Skeleton width={110} height={60} />)}

{/* <Divider variant="middle" orientation="vertical" /> */}
			{(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (<Button onClick={aoClicarEmSalvarEFechar} color='primary' disableElevation variant='outlined' startIcon={<Icon>save</Icon>}>
			<Typography variant='button' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>Salvar e voltar</Typography>
			</Button>)}
			{(mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (<Skeleton width={110} height={60} />)}
			{/* <Divider variant="middle" orientation="vertical" /> */}
			{(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (<Button onClick={aoClicarEmApagar} color='primary' disableElevation variant='outlined' startIcon={<Icon>delete</Icon>}>
			<Typography variant='button' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' >Apagar</Typography>
			</Button>)}
			{mostrarBotaoApagarCarregando && (<Skeleton width={110} height={60} />)}
			{/* <Divider variant="middle" orientation="vertical" /> */}
			{ (mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (<Button onClick={aoClicarEmNovo} color='primary' disableElevation variant='outlined' startIcon={<Icon>add</Icon>}>
			<Typography variant='button' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' >{textoBotaoNovo}</Typography>
			</Button>)}
			{(mostrarBotaoNovoCarregando && !smDown) && (<Skeleton width={110} height={60} />)}
			{/* <Divider variant="middle" orientation="vertical" /> */}
			{ (mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (<Button onClick={aoClicarEmVoltar} color='primary' disableElevation variant='outlined' startIcon={<Icon>arrow_back</Icon>}>
			<Typography variant='button' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' >Voltar</Typography>
			</Button>)}
			{mostrarBotaoVoltarCarregando && (<Skeleton width={110} height={60} />)}
		</Box>
	);
};
