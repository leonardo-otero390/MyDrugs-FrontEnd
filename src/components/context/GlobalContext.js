import { createContext, useState } from "react";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const [ userData, setUserData ] = useState({});
    const [ selectedProducts, setSelectedProducts ] = useState([])

    return (
        <GlobalContext.Provider value={{
            userData,
            selectedProducts,
            setSelectedProducts
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;