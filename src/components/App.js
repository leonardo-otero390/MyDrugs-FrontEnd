/* eslint-disable react/react-in-jsx-scope */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "../pages/cart/Cart";
import Products from "../pages/Products/Products";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Products />} />
				<Route exact path="/cart" element={<Cart />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
