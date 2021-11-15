import { createContext, useEffect, useState } from "react";
import API from "../../services/API/requests";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
	const [userData, setUserData] = useState({});
	const [cartProducts, setCartProducts] = useState([]);
	const [ cartId, setCartId ] = useState(-1)


	function updateCartProducts(cartProductsArray) {
		API.updateCart();
		setUserData({
			...userData,
			user: { ...userData.user, cart: cartProductsArray },
		});
		setLocalStorage({
			...userData,
			user: { ...userData.user, cart: cartProductsArray },
		});
		setCartProducts(cartProductsArray);
	}

	function getUserFromLocalStorage() {
		return JSON.parse(localStorage.getItem("myDrugs_user"));
	}

	function setLocalStorage(value) {
		localStorage.setItem("myDrugs_user", JSON.stringify(value));
	}

	return (
		<GlobalContext.Provider
			value={{
				userData,
				setUserData,
				cartProducts,
				updateCartProducts,
				setCartProducts,
				getUserFromLocalStorage,
				setLocalStorage,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
export default GlobalContext;