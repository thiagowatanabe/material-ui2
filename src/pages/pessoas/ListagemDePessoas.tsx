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
import { IListagemPessoa, PessoasServices } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas: React.FC = () => {
	const { debounce } = useDebounce(1000);
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const busca = useMemo(() => {
		return searchParams.get("busca") || "";
	}, [searchParams]);

	const pagina = useMemo(() => {
		return Number(searchParams.get("pagina") || "1");
	}, [searchParams]);

	const [rows, setRows] = useState<IListagemPessoa[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		debounce(() => {
			PessoasServices.getAll(pagina, busca).then((resp) => {
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
			PessoasServices.deleteById(id).then((result) => {
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
			titulo='Listagem de pessoas'
			barraDeFerramenta={
				<FerramentasDaListagem
					textoBotaoNovo='Nova'
					mostrarInputBusca
					textoDaBusca={busca}
					aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
					aoMudarTextoDeBusca={(texto) => setSearchParams({ busca: texto, pagina: "1" }, { replace: true })}
				/>
			}
		>
			<TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: "auto" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Ações</TableCell>
							<TableCell>Nome Completo</TableCell>
							<TableCell>Email</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.id}>
								<TableCell>
									<IconButton size='small' onClick={() => handleDelete(row.id)}>
										<Icon>delete</Icon>
									</IconButton>
									<IconButton size='small' onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
										<Icon>edit</Icon>
									</IconButton>
								</TableCell>
								<TableCell>{row.nomeCompleto}</TableCell>
								<TableCell>{row.email}</TableCell>
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
