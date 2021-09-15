import {
    BrowserRouter as Router
  } from "react-router-dom";

import './App.css';
import PageSwitch from "./components/extra/PageSwitch";

function App() {
    return (
        <div className="App">
            <Router>
                <PageSwitch/>
            </Router>
        </div>
    );
}

export default App;
