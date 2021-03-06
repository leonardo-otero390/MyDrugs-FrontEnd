/* eslint-disable react/react-in-jsx-scope */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import Cart from "../pages/cart/Cart";

import SignUp from "../pages/sign_up/SignUp";
import SignIn from "../pages/sign_in/SignIn";
import Products from "../pages/products/Products";

function App() {
	return (
		<BrowserRouter>
			<GlobalProvider>
				<Routes>
					<Route exact path="/" element={<Products />} />
					<Route exact path="/cart" element={<Cart />} />
					<Route exact path="/sign-in" element={<SignIn />} />
					<Route exact path="/sign-up" element={<SignUp />} />
				</Routes>
			</GlobalProvider>
		</BrowserRouter>
	);
}

export default App;
