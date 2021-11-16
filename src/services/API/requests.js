import axiosBase from "./axiosBase";

const API = {
	signUp,
	signIn,
	validateToken,
	logOut,
	getProducts,
	updateCart,
	getCart,
	addToCart,
	removeFromCart,
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

function validateToken(token) {
	return axiosBase.get("/sessions", createBearerAuthorization(token));
}

function logOut({ token }) {
	return axiosBase.delete("/sessions", createBearerAuthorization(token));
}
function checkout({ token, body }) {
	return axiosBase.post("/checkout", createBearerAuthorization(token),body);
}

function getProducts() {
	return axiosBase.get("/products");
}

// returns the cartId and all its products, if there is no products, return an empty array
async function getCart(token) {
	const response = await axiosBase.get(
		"/cart",
		createBearerAuthorization(token)
	);
	const productsArray = response.data.products.map((product) => ({
		...product,
		quantity: product.amount,
	}));

	return {
		cartId: response.data.cartId,
		products: productsArray,
	};
}

// body = { cartId, productId, amount: quantity }
async function addToCart(token, body) {
	const response = await axiosBase.put(
		"/cart",
		body,
		createBearerAuthorization(token)
	);
	const productsArray = response.data.products.map((product) => ({
		...product,
		quantity: product.amount,
	}));
	return {
		cartId: response.data.cartId,
		products: productsArray,
	};
}

async function removeFromCart(token, body) {
	console.log("SERVICE");
	console.log("body: ", body);
	console.log("token: ", token);
	const response = await axiosBase.delete("/cart", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			...body,
		},
	});
	const productsArray = response.data.products.map((product) => ({
		...product,
		quantity: product.amount,
	}));
	return {
		cartId: response.data.cartId,
		products: productsArray,
	};
}

function updateCart() {}

export default API;
