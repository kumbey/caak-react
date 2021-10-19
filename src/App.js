import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import PageSwitch from "./components/extra/PageSwitch";
import { ThemeProvider } from "./context/ThemeContext";
import { WrapperProvider } from "./context/wrapperContext";
import Container from "./components/Container";

function App() {
  return (
    <WrapperProvider>
      <ThemeProvider>
        <Container>
          <Router>
            <PageSwitch />
          </Router>
        </Container>
      </ThemeProvider>
    </WrapperProvider>
  );
}

export default App;
