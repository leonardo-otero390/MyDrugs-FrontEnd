/* eslint-disable react/react-in-jsx-scope */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import { GlobalProvider } from "../components/context/GlobalContext";
import styled from "styled-components";
import Summary from "./Summary";
import Tester from "./Summary/test";

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

          <Route exact path="/test" element={<Tester />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
