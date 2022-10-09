import {
	Icon,
	IconButton,
	LinearProgress,
	Pagination,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { IListagemCidade, CidadesServices } from "../../shared/services/api/cidades/CidadesService";

export const ListagemDeCidades: React.FC = () => {
	const { debounce } = useDebounce(1000);
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const busca = useMemo(() => {
		return searchParams.get("busca") || "";
	}, [searchParams]);

	const pagina = useMemo(() => {
		return Number(searchParams.get("pagina") || "1");
	}, [searchParams]);

	const [rows, setRows] = useState<IListagemCidade[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		debounce(() => {
			CidadesServices.getAll(pagina, busca).then((resp) => {
				setIsLoading(false);
				if (resp instanceof Error) {
					alert(resp.message);
					return;
				}

				console.log(resp);

				setRows(resp.data);
				setTotalCount(resp.totalCount);
			});
		});
	}, [busca, pagina,debounce]);

	const handleDelete = (id: number) => {
		if (window.confirm("Realmente deseja apagar?")) {
			CidadesServices.deleteById(id).then((result) => {
				if (result instanceof Error) {
					alert(result.message);
				} else {
					setRows((oldRows) => [...oldRows.filter((oldRow) => oldRow.id !== id)]);
					alert("Registro apagado com sucesso!");
				}
			});
		}
	};

	return (
		<LayoutBaseDePagina
			titulo='Listagem de Cidades'
			barraDeFerramenta={
				<FerramentasDaListagem
					textoBotaoNovo='Nova'
					mostrarInputBusca
					textoDaBusca={busca}
					aoClicarEmNovo={() => navigate("/cidades/detalhe/nova")}
					aoMudarTextoDeBusca={(texto) => setSearchParams({ busca: texto, pagina: "1" }, { replace: true })}
				/>
			}
		>
			<TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: "auto" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Ações</TableCell>
							<TableCell>Nome</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.id}>
								<TableCell>
									<IconButton size='small' onClick={() => handleDelete(row.id)}>
										<Icon>delete</Icon>
									</IconButton>
									<IconButton size='small' onClick={() => navigate(`/cidades/detalhe/${row.id}`)}>
										<Icon>edit</Icon>
									</IconButton>
								</TableCell>
								<TableCell>{row.nome}</TableCell>
							</TableRow>
						))}
					</TableBody>

					{totalCount === 0 && !isLoading && <caption>{Environment.LISTAGEM_VAZIA}</caption>}

					<TableFooter>
						{isLoading && (
							<TableRow>
								<TableCell colSpan={3}>
									{" "}
									<LinearProgress variant='indeterminate' />
								</TableCell>
							</TableRow>
						)}

						{totalCount > Environment.LIMITE_DE_LINHAS && !isLoading && (
							<TableRow>
								<TableCell colSpan={3}>
									<Pagination
										page={pagina}
										count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
										onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
									/>
								</TableCell>
							</TableRow>
						)}
					</TableFooter>
				</Table>
			</TableContainer>
		</LayoutBaseDePagina>
	);
};
