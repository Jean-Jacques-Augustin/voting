import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Confirm from "./pages/confirm";
import Voter from "./pages/voter";
import Resultat from "./pages/resultat";
import Dashboard from "./pages/dashboard";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Unauthorized from "./pages/Unauthorized";
import NavigationBar from "./components/NavigationBar";

function App() {
	const isLogged = useSelector((state) => state.user.isLogged);
	const isAdmin = useSelector((state) => state.user.role);

	const hasAdminRole = () => {
		if (isAdmin === "admin") {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className="App"
			
		>
			<NavigationBar/>

			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/confirm"
					element={isLogged ? <Confirm /> : <Unauthorized />}
				/>
				<Route
					path="/voter"
					element={isLogged ? <Voter /> : <Unauthorized />}
				/>
				<Route
					path="/resultat"
					element={isLogged ? <Resultat /> : <Unauthorized />}
				/>
				<Route
					path="/dashboard/*"
					element={
						hasAdminRole && isLogged ? (
							<Dashboard />
						) : (
							<Unauthorized />
						)
					}
				/>
				<Route path="*" element={<h1>Not Found</h1>} />
			</Routes>
		</div>
	);
}

export default App;
