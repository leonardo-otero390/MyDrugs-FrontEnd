import axiosBase from "./axiosBase";

const API = {
	signUp,
	signIn,
	logOut,
	getProducts,
	updateCart,
	getCart,
	addToCart,
	removeFromCart
};

function createBearerAuthorization(token) {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}

function signUp({ name, cpf, email, password }) {
	return axiosBase.post("/sign-up", {
		name,
		cpf,
		email,
		password,
	});
}

function signIn({ cpf, email, password }) {
	return axiosBase.post("/sign-in", {
		cpf,
		email,
		password,
	});
}

function logOut({ token }) {
	return axiosBase.delete("/sessions", createBearerAuthorization(token));
}

// returns the cartId and all its products, if there is no products, return an empty array
async function getCart(token) {
    const response = await axiosBase.get("/cart", createBearerAuthorization(token))
	const productsArray = response.data.products.map(product => ({ ...product, quantity: product.amount }))

	return {
		carttId: response.data.cartId,
		products: productsArray
	}
}

// body = { cartId, productId, amount: quantity }
async function addToCart(token, body) {
	const response = await axiosBase.put("/cart", body, createBearerAuthorization(token))
	const productsArray = response.data.products.map(product => ({ ...product, quantity: product.amount }))
	return {
		carttId: response.data.cartId,
		products: productsArray
	}
}

async function removeFromCart(token, body) {
	const response = await axiosBase.delete("/cart", body, createBearerAuthorization(token))
	const productsArray = response.data.products.map(product => ({ ...product, quantity: product.amount }))
	return {
		carttId: response.data.cartId,
		products: productsArray
	}
}



function updateCart() { }

export default API;
