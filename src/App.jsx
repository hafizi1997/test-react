import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth/authwrapper";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
