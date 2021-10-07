import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import PageSwitch from "./components/extra/PageSwitch";
import { OverlayProvider } from "./context/useOverlay";

function App() {
  return (
    <Router>
      <OverlayProvider>
        <PageSwitch />
      </OverlayProvider>
    </Router>
  );
}

export default App;
