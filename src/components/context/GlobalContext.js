import { createContext, useEffect, useState } from "react";
import API from "../../services/API/requests";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
	const [userData, setUserData] = useState({});
	const [cartProducts, setCartProducts] = useState([]);
	const [cartId, setCartId] = useState(-1);
	const [update, setUpdate] = useState(0);
	const [removedProduct, setRemovedProduct] = useState(false);

	//load locally storaged data, if a token is found, request the cart data from server
	useEffect(() => {
		// console.log("RUNNING GLOBAL USE EFFECT LOAD CART");
		const storagedData = getUserFromLocalStorage();
		// console.log("storagedData: ", storagedData);
		if (userData.token) {
			// console.log("LOADING GLOBAL CONTEXT CART DATA FROM BACKEND");
			// console.log("sending this token: ", userData.token);
			API.getCart(userData.token).then((res) => {
				// console.log("CART RECEIVED");
				// console.log("RESPONSE: ", res);
				setCartId(res.cartId);
				setCartProducts(res.products);
			});
		}
		/* 		else if(storagedData?.user?.cart) setCartProducts(storagedData.user.cart)
		if(storagedData?.user?.cartId) setCartId(storagedData.user.cartId) */
		// setLocalStorage({ ...userData, cart: cartProducts, cartId });
	}, [userData, setCartProducts, update]);

	useEffect(() => {
		// if (userData.cart) {
		// console.log("setting local storage to: ");
		// console.log({ ...userData, cart: cartProducts, cartId });
		// setLocalStorage({ ...userData, cart: cartProducts, cartId });
		// }
		const storageData = getUserFromLocalStorage();
		// console.log("USE EFFECT DO CART");
		// console.log({ cartProducts });

		// return () => {
		if (cartProducts.length) {
			// console.log("tem cartProducts");
			// console.log({ cartProducts });

			// console.log("setting local storage to: ");
			// console.log({ ...userData, cart: cartProducts, cartId });
			setLocalStorage({ ...userData, cart: cartProducts, cartId });
		} else if (storageData?.cart?.length && !removedProduct) {
			setCartProducts(storageData.cart);
			// console.log("setting user data to: ");
			// console.log({ ...storageData, cart: storageData.cart, cartId });
			// setUserData({ ...storageData, cart: storageData.cart, cartId });
		} else {
			setLocalStorage({ ...userData, cart: cartProducts, cartId });
		}
		// };
	}, [cartProducts, cartId]);

	useEffect(() => {
		const storageData = getUserFromLocalStorage();

		if (storageData.token)
			API.validateToken(storageData.token)
				.then((resp) => {
					// console.log("token valido");
					// console.log(resp);
					setUserData(storageData);
				})
				.catch((err) => {
					// console.log("token inválido");
					// console.log(err.response);
					delete storageData.user;
					delete storageData.token;
					// console.log({ storageData });
					setUserData({ ...storageData });
				});
	}, []);

	function updateCartProducts(newCartProductsArray, product) {
		// setCartProducts(newCartProductsArray);
		setRemovedProduct(true);
		// console.log("GLOBAL updateCartProducts");
		console.log("newCartProductsArray: ", newCartProductsArray);
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
			// console.log("REMOVENDO");
			// console.log("removing product: ", product);
			// console.log("sendingToken: ", userData.token);
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
			// console.log("alterando cartProducts");
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
				cartId,
				cartProducts,
				updateCartProducts,
				setCartProducts,
				getUserFromLocalStorage,
				setLocalStorage,
				setUpdate
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
export default GlobalContext;
