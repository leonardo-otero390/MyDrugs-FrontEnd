import { createContext, useEffect, useState } from "react";
import API from "../../services/API/requests";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
	const [userData, setUserData] = useState({});
	const [cartProducts, setCartProducts] = useState([]);
	const [ cartId, setCartId ] = useState(-1)
	const [ update, setUpdate ] = useState(0)





	//load locally storaged data, if a token is found, request the cart data from server
	useEffect(() => {
		const storagedData = getUserFromLocalStorage();
		if(storagedData?.token) {
			console.log("LOADING GLOBAL CONTEXT CART DATA FROM BACKEND")
			API.getCart(userData.token)
				.then(res => {
					setCartId(res.cartId)
					setCartProducts(res.products)
				})
			setUserData({ ...userData, token: userData.token })
		}
		if(storagedData?.user?.cart) setCartProducts(storagedData.user.cart)
		if(storagedData?.user?.cartId) setCartId(storagedData.user.cartId)

		return () => { 
			console.log("GLOBAL CONTEXT useEffect saving locally")
			setLocalStorage({ ...userData, cart: cartProducts, cartId })
		}
	}, [ setUserData, setCartProducts, update ])




	function updateCartProducts(newCartProductsArray, product) {
		console.log("GLOBAL updateCartProducts")


		if(newCartProductsArray.length >= cartProducts.length && userData.token) {
			console.log("ADICIONANDO")
			API.addToCart(userData.token, {
				cartId,
				productId: product.id,
				amount: product.quantity
			})
			.then(res => { setCartProducts(res.products) })
			.catch(e => {
				console.log(e)
				alert("ERRO update cart products")
			})
		}

		else if(userData.token) {
			console.log("REMOVENDO")
			API.removeFromCart(userData.token, {
				cartId,
				productId: product.id
			})
			.then(res => { setCartProducts(res.products) })
			.catch(e => {
				console.log(e)
				alert("ERRO updateCartProducts")
			})
		}



/* 		setUserData({
			...userData,
			user: { ...userData.user, cart: cartProductsArray },
		});
		setLocalStorage({
			...userData,
			user: { ...userData.user, cart: cartProductsArray },
		});
		setCartProducts(cartProductsArray); */
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