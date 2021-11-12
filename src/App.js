/* eslint-disable react/react-in-jsx-scope */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/sign_in/SignIn";
import SignUp from "./pages/sign_up/SignUp";
import Products from "./pages/products/Products";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Products />}></Route>
				<Route exact path="/sign-in" element={<SignIn />}></Route>
				<Route exact path="/sign-up" element={<SignUp />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
