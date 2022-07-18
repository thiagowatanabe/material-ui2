import { Environment } from "./../../../environment";
import { api } from "../axios-config";

export interface IListagemPessoa {
	id: number;
	nomeCompleto: string;
	email: string;
	cidadeId: number;
}

export interface IDetalhePessoa {
	id: number;
	nomeCompleto: string;
	email: string;
	cidadeId: number;
}

type TPessoasComTotalCount = {
	data: IListagemPessoa[];
	totalCount: number;
};

const getAll = async (page = 1, filter = ""): Promise<TPessoasComTotalCount | Error> => {
	try {
		const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
		const { data,headers } = await api.get(urlRelativa);
		if (data) {
			return {
				data,
				totalCount: Number(headers["x-total-count"] || Environment.LIMITE_DE_LINHAS),
			};
		}

		return new Error("Erro ao listar os registross");
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || "Erro ao listar os registros teste");
	}
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
	try {
		const { data } = await api.get(`/pessoas/${id}`);

		if (data) {
			return data;
		}

		return new Error("Erro ao consultar os registros");
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || "Erro ao consultar os registros");
	}
};

const create = async (dados: Omit<IDetalhePessoa, "id">): Promise<number | Error> => {
	try {
		const { data } = await api.post<IDetalhePessoa>("/pessoas", dados);

		if (data) {
			return data.id;
		}

		return new Error("Erro ao cadastrar os registros");
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || "Erro ao cadastrar os registros");
	}
};

const updateById = async (id:number, dados: IDetalhePessoa): Promise<void | Error> => {
	try {
		await api.put<IDetalhePessoa>(`/pessoas/${id}`, dados);
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || "Erro ao listar os registros");
	}
};

const deleteById = async (id: number): Promise<void | Error> => {
	try {
		await api.delete(`/pessoas/${id}`);
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || "Erro ao listar os registros");
	}
};

export const PessoasServices = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
};
