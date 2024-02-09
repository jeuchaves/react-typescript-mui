import { useCallback, useContext, useState, createContext } from "react";

interface IDrawerContextData {
    isDrawerOpen: boolean;
    drawerOptions: IDrawerOption[];
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void
}
const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
    return useContext(DrawerContext);
}

interface IThemeProviderProps {
    children: React.ReactNode
}
interface IDrawerOption {
    icon: string;
    label: string;
    path: string;
}
export const DrawerProvider: React.FC<IThemeProviderProps> = ({ children }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOptions(newDrawerOptions);
    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
            {children}
        </DrawerContext.Provider>
    )
}