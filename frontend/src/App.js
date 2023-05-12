import './App.css';
import Dashboard from './pages/dashboard';
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage";

function App() {
    return (<div className="App">
        <Routes>
            <Route path={"/"} element={<Homepage/>}/>
            <Route path={"/dashboard/*"} element={<Dashboard/>}/>
        </Routes>
    </div>);
}

export default App;
