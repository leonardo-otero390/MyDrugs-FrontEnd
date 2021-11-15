import axiosBase from "./axiosBase";

const API = {
	checkout,
	signUp,
	signIn,
	logOut,
	updateCart,
	getCart
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
function checkout({ token, body }) {
	return axiosBase.post("/checkout", createBearerAuthorization(token),body);
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
	return axiosBase.put("/cart", body, createBearerAuthorization(token))
}



function updateCart() { }

export default API;
