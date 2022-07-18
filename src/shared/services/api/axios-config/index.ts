import axios from 'axios';
import { Environment } from '../../../environment';
import { responseInterceptor, errorInteceptors } from './interceptors';

const api = axios.create({
    baseURL: Environment.URL_BASE
});

api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInteceptors(error),
)

export {api};