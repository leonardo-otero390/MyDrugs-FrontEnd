import { createContext, useEffect, useState } from "react";
import API from "../../services/API/requests";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
	const [userData, setUserData] = useState({});
	const [cartProducts, setCartProducts] = useState([]);
	const [cartId, setCartId] = useState(-1);
	const [update, setUpdate] = useState(0);

	useEffect(() => {
		const storagedData = getUserFromLocalStorage();
		console.log("RUNNING GLOBAL USE EFFECT VALIDATE TOKEN");
		console.log({ storagedData });

		setUserData(storagedData);

		console.log({ userData });

		if (storagedData?.token) {
			console.log("TOKEN IS STORAGED");
			API.validateToken(storagedData.token)
				.then((resp) => {
					console.log("token valido");
					console.log(resp);
					setUserData(storagedData);
				})
				.catch((err) => {
					console.log("token inválido");
					console.log(err.response);
					delete storagedData.token;
					console.log({ storagedData });
					setUserData(storagedData);
				});
		} else {
			console.log("TOKEN IS NOT STORAGED");
			delete storagedData.token;
			console.log({ storagedData });
			setUserData(storagedData);
		}
	}, [update]);

	//load locally storaged data, if a token is found, request the cart data from server
	useEffect(() => {
		console.log("RUNNING GLOBAL USE EFFECT LOAD CART");

		const storagedData = getUserFromLocalStorage();
		console.log({ storagedData });

		// setUserData(storagedData);

		if (userData.token) {
			console.log("user data tem token");
			console.log({ userData });

			console.log("LOADING GLOBAL CONTEXT CART DATA FROM BACKEND");
			console.log("sending this token: ", userData.token);
			API.getCart(userData.token).then((res) => {
				console.log("CART RECEIVED");
				console.log("RESPONSE: ", res);
				console.log({ storagedData });
				setCartId(res.cartId);
				setCartProducts(res.products);
				setLocalStorage({ ...storagedData, cart: res.products, cartId });
			});
		} else {
			console.log("user data nao tem token");
			console.log({ userData });

			delete userData.user;

			console.log({ cartProducts });
			console.log({ storagedData });

			setLocalStorage({
				...userData,
				cart: cartProducts.length ? cartProducts : storagedData.cart,
				cartId,
			});

			// setUpdate(update + 1);
		}

		/* 		else if(storagedData?.user?.cart) setCartProducts(storagedData.user.cart)
		if(storagedData?.user?.cartId) setCartId(storagedData.user.cartId) */
		// console.log({ userData });
	}, [userData, update]);

	// useEffect(() => {
	// 	setLocalStorage({ ...userData, cart: cartProducts, cartId });
	// 	console.log("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
	// }, [cartProducts]);

	function updateCartProducts(newCartProductsArray, product) {
		// console.log("GLOBAL updateCartProducts");
		// console.log("newCartProductsArray: ", newCartProductsArray);
		// console.log("cartProducts: ", cartProducts);
		// console.log("product: ", product);
		// console.log("cartId: ", cartId);

		// console.log("newCartArray.length: ", newCartProductsArray.length);
		// console.log("savedCartLength: ", cartProducts.length);

		if (newCartProductsArray.length > cartProducts.length && userData.token) {
			// console.log("ADICIONANDO");
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
		} else if (!userData.token) {
			setCartProducts(newCartProductsArray);
		}
		setUpdate(update + 1);

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
