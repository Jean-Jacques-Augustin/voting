import './App.css';
import Dashboard from './pages/dashboard';
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Confirm from "./pages/confirm";


function App() {




    return (<div className="App">
        <Routes>
            <Route path={"/"} element={<Homepage/>}/>
            <Route path={"/dashboard/*"} element={<Dashboard/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/confirm' element={<Confirm/>}/>
        </Routes>
    </div>);
}

export default App;
