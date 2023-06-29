import "./App.css";
import Dashboard from "./pages/dashboard";
import {Route, Router, Routes} from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Confirm from "./pages/confirm";
import Voter from "./pages/voter";
import Resultat from "./pages/resultat";

// entry point of the app
function App() {
    return (<div className="App">
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/dashboard/*" element={<Dashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/confirm" element={<Confirm/>}/>
            <Route path="/voter" element={<Voter/>}/>
            <Route path="*" element={<h1>Not Found</h1>}/>
            <Route path={"/resultat"} element={<Resultat/>}/>
        </Routes>
    </div>)
}

export default App;
