import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import PageSwitch from "./components/extra/PageSwitch";
import { WrapperProvider } from "./context/wrapperContext";

function App() {
  return (
    <Router>
      <PageSwitch />
    </Router>
  );
}

export default App;
