import { createContext, useEffect, useState } from "react";
import API from "../../services/API/requests";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
	const [userData, setUserData] = useState({});
	const [cartProducts, setCartProducts] = useState([]);
	const [cartId, setCartId] = useState(-1);
	const [update, setUpdate] = useState(0);

	//load locally storaged data, if a token is found, request the cart data from server
	useEffect(() => {
		console.log("RUNNING GLOBAL USE EFFECT LOAD CART");
		const storagedData = getUserFromLocalStorage();
		console.log("storagedData: ", storagedData);
		if (userData.token) {
			console.log("LOADING GLOBAL CONTEXT CART DATA FROM BACKEND");
			console.log("sending this token: ", userData.token);
			API.getCart(userData.token).then((res) => {
				console.log("CART RECEIVED");
				console.log("RESPONSE: ", res);
				setCartId(res.cartId);
				setCartProducts(res.products);
			});
		}
		/* 		else if(storagedData?.user?.cart) setCartProducts(storagedData.user.cart)
		if(storagedData?.user?.cartId) setCartId(storagedData.user.cartId) */
	}, [userData, setCartProducts, update]);

	useEffect(() => {
		setLocalStorage({ ...userData, cart: cartProducts, cartId });
	}, [cartProducts]);

	function updateCartProducts(newCartProductsArray, product) {
		console.log("GLOBAL updateCartProducts");
		console.log("newCartProductsArray: ", newCartProductsArray);
		console.log("cartProducts: ", cartProducts);
		console.log("product: ", product);
		console.log("cartId: ", cartId);

		console.log("newCartArray.length: ", newCartProductsArray.length);
		console.log("savedCartLength: ", cartProducts.length);

		setCartProducts(newCartProductsArray);

		if (newCartProductsArray.length > cartProducts.length && userData.token) {
			console.log("ADICIONANDO");
			API.addToCart(userData.token, {
				cartId,
				productId: product.id,
				amount: product.quantity,
			})
				.then((res) => {
					setCartProducts(res.products);
				})
				.catch((e) => {
					console.log(e);
					alert("ERRO update cart products");
				});
		} else if (userData.token) {
			console.log("REMOVENDO");
			console.log("removing product: ", product);
			console.log("sendingToken: ", userData.token);
			API.removeFromCart(userData.token, {
				cartId,
				productId: product.id,
			})
				.then((res) => {
					setCartProducts(res.products);
				})
				.catch((e) => {
					console.log(e);
					alert("ERRO updateCartProducts");
				});
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
