import { createContext, useState } from "react";
import API from "../../services/API/requests";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
	const [userData, setUserData] = useState({});
	const [cartProducts, setCartProducts] = useState([]);

	function updateCartProducts(cartProductsArray) {
		API.updateCart();
		setCartProducts(cartProductsArray);
	}

	return (
		<GlobalContext.Provider
			value={{
				userData,
				setUserData,
				cartProducts,
				updateCartProducts,
				setCartProducts,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

export default GlobalContext;
