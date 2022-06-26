import { createContext, useCallback, useContext, useState } from "react";

interface IDrawerContextData {
	isDrawerOpen: boolean;
	toggleDrawerOpen: () => void;
	drawerOptions: IDrawerOptions[];
	setDrawerOption: (newDrawerOptions:IDrawerOptions[]) => void;
    children?: React.ReactNode;
}

interface IDrawerOptions{
	path:string;
	icon:string;
	label:string;
}

type Props = {
    children: React.ReactNode
};

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC<Props> = ({ children }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerOptions,setDrawerOptions] = useState<IDrawerOptions[]>([])

	const toggleDrawerOpen = useCallback(() => {
		setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
	}, []);

	const handleSetDrawerOptions = useCallback((newDrawerOptions:IDrawerOptions[])  => {
		setDrawerOptions(newDrawerOptions);
	}, []);

	return (
		<DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, setDrawerOption:handleSetDrawerOptions, toggleDrawerOpen }}>
			{children}
		</DrawerContext.Provider>
	);
};
