/* eslint-disable react/react-in-jsx-scope */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "../pages/Products/Products";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Products />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
