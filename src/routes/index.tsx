import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ListagemDePessoas,DetalheDePessoas, ListagemDeCidades, DetalheDeCidades } from "../pages";  

import { useAppDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
	const { setDrawerOption } = useAppDrawerContext();

	useEffect(() => {
		setDrawerOption([
			{
				label: "Página Inicial",
				icon: "home",
				path: "/pagina-inicial",
			},
			{
				label: "Pessoas",
				icon: "people",
				path: "/pessoas",
			},
			{
				label: "Cidades",
				icon: "location_city",
				path: "/cidades",
			}
		]);
	}, [setDrawerOption]);

	return (
		<Routes>
			<Route path='/pagina-inicial' element={<Dashboard />} />
			<Route path='/pessoas' element={<ListagemDePessoas />} />
			<Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas/>} />
			<Route path='/cidades' element={<ListagemDeCidades/>} />
			<Route path='/cidades/detalhe/:id' element={<DetalheDeCidades/>} />
			<Route path='*' element={<Navigate to='/pagina-inicial' />} />
		</Routes>
	);
};
