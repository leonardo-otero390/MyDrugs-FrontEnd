import { createContext, useState } from "react";
import { updateCart } from "../../services/API/requests";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const [ userData, setUserData ] = useState({});
    const [ selectedProducts, setSelectedProducts ] = useState([])

    function updateSelectedProducts(selectedProductsArray) {
        updateCart()
        setSelectedProducts(selectedProductsArray)
    }

    return (
        <GlobalContext.Provider value={{
            userData,
            selectedProducts,
            updateSelectedProducts
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;