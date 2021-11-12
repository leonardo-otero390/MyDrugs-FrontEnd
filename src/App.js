/* eslint-disable react/react-in-jsx-scope */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from '../src/pages/sign_up/SignUp'
function App () {
  return (
    <BrowserRouter>
		<Routes>
			<Route exact path="/">
				{/* <SignIn /> */}
			</Route>
			<Route exact path="/sign-up" element={<SignUp />}>
				
			</Route>					
		</Routes>
	</BrowserRouter>
  );
};

export default App;
