import { AxiosError } from "axios";

export const errorInteceptors = (error:AxiosError) => {

    if(error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conexão'))
    }

    if(error.response?.status === 401){
        //error de autenticação.
        //Do something
    }


    return Promise.reject(error);
}