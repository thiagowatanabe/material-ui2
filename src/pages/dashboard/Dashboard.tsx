import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () =>{
    return(
        <LayoutBaseDePagina titulo="Dashboard" barraDeFerramenta={
            <FerramentasDaListagem mostrarInputBusca/>
        }>
            Testando
        </LayoutBaseDePagina>
    )
};