import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Drawer,
	Container,
     Box,
     Avatar,
     Button,
     Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ViewListIcon from "@mui/icons-material/ViewList";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";

const connectedRoutes = [
	{
		path: "/",
		name: "Accueil",
		icon: <HomeIcon />,
	},
	{
		path: "/voter",
		name: "Voter",
		icon: <HowToVoteIcon />,
	},
	{
		path: "/resultat",
		name: "Résultat",
		icon: <ViewListIcon />,
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		icon: <DashboardIcon />,
	},
];

const unconnectedRoutes = [
	{
		path: "/",
		name: "Accueil",
		icon: <HomeIcon />,
	},
	{
		path: "/login",
		name: "Se connecter",
		icon: <LockOpenIcon />,
	},
	{
		path: "/signup",
		name: "S'inscrire",
		icon: <HowToRegIcon />,
	},
];

export default function NavigationBar() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [drawerOpen, setDrawerOpen] = React.useState(false);
	const user = useSelector((state) => state.user);

	const routes = user.isLogged ?  connectedRoutes : unconnectedRoutes;
	const isAdmin = user.isAdmin;

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	const renderRoutes = () => {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					border: "1px solid black",
				}}
			>
				{routes.map((route, index) => (
					<ListItem
						key={index}
						component={Link}
						to={route.path}
						button
						onClick={handleDrawerToggle}
					>
						<ListItemIcon>{route.icon}</ListItemIcon>
						<ListItemText primary={route.name} />
					</ListItem>
				))}
			</div>
		);
	};

	return (
		<React.Fragment>
			<AppBar>
				<Container>
					<Toolbar
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Typography variant="h6" component="div">
							Voting App
						</Typography>
						{isMobile ? (
							<React.Fragment>
								<IconButton
									edge="end"
									color="inherit"
									aria-label="menu"
									onClick={handleDrawerToggle}
								>
									<MenuIcon />
								</IconButton>
								<Drawer
									anchor="left"
									open={drawerOpen}
									onClose={handleDrawerToggle}
									sx={{
										"& .MuiDrawer-paper": {
											boxSizing: "border-box",
											width: 300,
										},
									}}
								>
									<div
										style={{
											marginTop: "2vh",
										}}
									>
										<Avatar
											style={{
												margin: "auto",
												color: "inherit",
											}}
											size="large"
										>
											{
                                                            user ? user.username[0] : "U"
                                                       }
										</Avatar>
										<Typography
											style={{
												textAlign: "center",
												marginTop: 5,
												marginBottom: 5,
											}}
											variant="h6"
										>
											{
                                                            user ? user.username : "Utilisateur"
                                                       }
										</Typography>

										<Typography
											style={{
												textAlign: "center",
												marginBottom: 5,
											}}
											variant="subtitle1"
										>
											{
                                                            user ? user.role : "Non connecté"
                                                       }
										</Typography>
									</div>
                                             <Divider />
									{routes.map((route, index) => (
										<ListItem
											key={index}
											component={Link}
											to={route.path}
											button
											onClick={
												handleDrawerToggle
											}
										>
											<ListItemIcon>
												{route.icon}
											</ListItemIcon>
											<ListItemText
												primary={route.name}
											/>
										</ListItem>
									))}
								</Drawer>
							</React.Fragment>
						) : (
							<ul
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									listStyleType: "none",
								}}
							>
								{routes.map((route, index) => (
									<li
										key={index}
										style={{
											display: "inline",
											margin: "0 10px",
										}}
									>
										<Link
											to={route.path}
											style={{
												textDecoration:
													"none",
												color: "inherit",
											}}
										>
											{route.name}
										</Link>
									</li>
								))}
							</ul>
						)}
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
		</React.Fragment>
	);
}
