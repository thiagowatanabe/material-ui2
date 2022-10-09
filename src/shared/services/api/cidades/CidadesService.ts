import { Environment } from "./../../../environment";
import { api } from "../axios-config";

export interface IListagemCidade {
	id: number;
	nome: string;
}
export interface IDetalheCidade {
	id: number;
	nome: string;
}

type TCidadeComTotalCount = {
	data: IListagemCidade[];
	totalCount: number;
};

const getAll = async (page = 1, filter = ""): Promise<TCidadeComTotalCount | Error> => {
	try {
		const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
	try {
		const { data } = await api.get(`/cidades/${id}`);

		if (data) {
			return data;
		}

		return new Error("Erro ao consultar os registros");
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || "Erro ao consultar os registros");
	}
};

const create = async (dados: Omit<IDetalheCidade, "id">): Promise<number | Error> => {
	try {
		const { data } = await api.post<IDetalheCidade>("/cidades", dados);

		if (data) {
			return data.id;
		}

		return new Error("Erro ao cadastrar os registros");
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || "Erro ao cadastrar os registros");
	}
};

const updateById = async (id:number, dados: IDetalheCidade): Promise<void | Error> => {
	try {
		await api.put<IDetalheCidade>(`/cidades/${id}`, dados);
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || "Erro ao listar os registros");
	}
};

const deleteById = async (id: number): Promise<void | Error> => {
	try {
		await api.delete(`/cidades/${id}`);
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || "Erro ao listar os registros");
	}
};

export const CidadesServices = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
};
