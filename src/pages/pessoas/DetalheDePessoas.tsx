import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasService";

import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";

import * as yup from "yup";

interface IFormData {
	email: string;
	cidadeId: number;
	nomeCompleto: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
	nomeCompleto: yup.string().required().min(3),
	email: yup.string().required().email(),
	cidadeId: yup.number().required(),
});

export const DetalheDePessoas: React.FC = () => {
	const { id = "nova" } = useParams<"id">();
	const navigate = useNavigate();

	const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

	useEffect(() => {
		if (id !== "nova") {
			setIsLoading(true);
			PessoasServices.getById(Number(id)).then((result) => {
				setIsLoading(false);
				if (result instanceof Error) {
					alert(result.message);
					navigate("/pessoas");
				} else {
					setNome(result.nomeCompleto);
					formRef.current?.setData(result);
				}
			});
		} else {
			formRef.current?.setData({ nomeCompleto: "", email: "", cidadeId: "" });
		}
	}, [id,formRef,navigate]);

	const [isLoading, setIsLoading] = useState(false);
	const [nome, setNome] = useState("");

	const handleSave = (dados: IFormData) => {
		formValidationSchema
			.validate(dados, { abortEarly: false })
			.then((dadosValidados) => {
				setIsLoading(true);
				if (id === "nova") {
					PessoasServices.create(dadosValidados).then((result) => {
						setIsLoading(false);
						if (result instanceof Error) {
							alert(result.message);
						} else {
							if (isSaveAndClose()) {
								navigate("/pessoas");
							} else {
								navigate(`/pessoas/detalhe/${result}`);
							}
						}
					});
				} else {
					PessoasServices.updateById(Number(id), { id: Number(id), ...dadosValidados }).then((result) => {
						setIsLoading(false);
						if (result instanceof Error) {
							alert(result.message);
						} else {
							if (isSaveAndClose()) {
								navigate("/pessoas");
							}
						}
					});
				}
			})
			.catch((errors: yup.ValidationError) => {
				const validationErrors: IVFormErrors = {};

				errors.inner.forEach(error => {
					if(!error.path) return;

					validationErrors[error.path] = error.message;
				});

				formRef.current?.setErrors(validationErrors);

			});
	};

	const handleDelete = (id: number) => {
		if (window.confirm("Realmente deseja apagar?")) {
			PessoasServices.deleteById(id).then((result) => {
				if (result instanceof Error) {
					alert(result.message);
				} else {
					alert("Registro apagado com sucesso!");
					navigate("/pessoas");
				}
			});
		}
	};

	return (
		<LayoutBaseDePagina
			titulo={id === "nova" ? "Nova Pessoa" : nome}
			barraDeFerramenta={
				<FerramentasDeDetalhes
					textoBotaoNovo='Nova'
					mostrarBotaoSalvarEFechar
					mostrarBotaoNovo={id !== "nova"}
					mostrarBotaoApagar={id !== "nova"}
					aoClicarEmSalvar={() => save}
					aoClicarEmSalvarEFechar={() => saveAndClose}
					aoClicarEmApagar={() => handleDelete(Number(id))}
					aoClicarEmVoltar={() => navigate("/pessoas")}
					aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
				/>
			}
		>
			<VForm ref={formRef} onSubmit={handleSave}>
				<Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
					<Grid container direction='column' padding={2} spacing={2}>
						<Grid item>
							<Typography variant='h6'>Geral</Typography>
						</Grid>

						{isLoading && (
							<Grid item>
								<LinearProgress variant='indeterminate' />
							</Grid>
						)}

						<Grid container item direction='row'>
							<Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
								<VTextField
									fullWidth
									label='Nome Completo'
									name='nomeCompleto'
									disabled={isLoading}
									onChange={(e) => setNome(e.target.value)}
								/>
							</Grid>
						</Grid>

						<Grid container item direction='row'>
							<Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
								<VTextField fullWidth label='E-mail' name='email' disabled={isLoading} />
							</Grid>
						</Grid>

						<Grid container item direction='row'>
							<Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
								<VTextField fullWidth label='Cidade' name='cidadeId' disabled={isLoading} />
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</VForm>
		</LayoutBaseDePagina>
	);
};
