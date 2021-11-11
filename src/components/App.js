/* eslint-disable react/react-in-jsx-scope */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import GlobalProvider from "../components/context/GlobalContext";

function App () {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/">
            {/* <SignIn /> */}
          </Route>
          <Route exact path="/sign-up" element={<SignUp />}>
            
          </Route>					
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
