import './App.css';
import NavBar from "./components/navigation/NavBar";
import UserInformation from "./pages/Register/UserInformation";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <UserInformation/>
        </div>
    );
}

export default App;
