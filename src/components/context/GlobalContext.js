import { createContext, useState } from "react";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const [ userData, setUserData ] = useState({});
    const [ selectedProducts, setSelectedProducts ] = useState([
        {
            name:"clonazepan",
            description:"Product description, nothing too much important just a lorem ipsum to preencher tudo",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntsqa5WFKMcDxTYJIM1taDmqlEay2jkwSsg&usqp=CAU",
            quantity:1,
            price:99.99
}])

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