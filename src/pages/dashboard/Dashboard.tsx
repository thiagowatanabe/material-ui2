import { FerramentasDeDetalhes } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () =>{
    return(
        <LayoutBaseDePagina titulo="Dashboard" barraDeFerramenta={
            <FerramentasDeDetalhes mostrarBotaoSalvarEFechar/>
        }>
        </LayoutBaseDePagina>
    )
};