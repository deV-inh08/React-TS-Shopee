import { createContext, useState } from "react";
import { getAccessTokenFromLS } from "../utils/auth";
import { User } from "../types/user.type";

// Interface for the context
interface AppContextInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    profile: User | null
    setProfile: React.Dispatch<React.SetStateAction<User | null>>
};

// Initial context value
const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getAccessTokenFromLS()),
    setIsAuthenticated: () => null,
    profile: null,
    setProfile: () => null
};

// Create the context
export const AppContext = createContext<AppContextInterface>(initialAppContext);

// AppProvider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        initialAppContext.isAuthenticated
    );

    const [profile, setProfile] = useState<User | null>(initialAppContext.profile);


    // Passing state and function to context value
    const value = {
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
