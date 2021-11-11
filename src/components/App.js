import Summary from "./Summary";
import { GlobalProvider } from "./context/GlobalContext";


const App = function () {
  return (
    <GlobalProvider>
      <div>
        Wellcome to MyDrugs
        <Summary />
      </div>
    </GlobalProvider>
  );
};

export default App;
