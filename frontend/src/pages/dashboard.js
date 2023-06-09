import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { routes } from "../data/routes";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import Users from "./dashboard/users";
import { Route, Routes } from "react-router-dom";
import Candidat from "./dashboard/candidat";
import { Link } from "react-router-dom";
import NavControl from "../components/NavControl";
import Votes from "./dashboard/voter";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tooltip, Avatar, Button } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1), // necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth, //width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function Dashboard() {
	const theme = useTheme();
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.user);

	const handleDrawerOpen = () => {
		setOpen(!open);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
						}}
					>
						{open ? <CloseIcon /> : <MenuIcon />}
					</IconButton>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%",
						}}
					>
						<Typography variant="h6" noWrap component="div">
							Voting App
						</Typography>
            <Button
              onClick={() => navigate("/")}
              sx={{
                textTransform: 'none',
              }}
              color="inherit"
              startIcon={<ExitToAppIcon />}
              >
                Revenir à l'accueil
              </Button>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<div
          style={{
            marginTop: '2vh',
            }}
        >
					<Avatar
						style={{
							margin: "auto",
							color: "inherit",
						}}
						size="large"
					>
						{user.username[0]}
					</Avatar>
          <Typography
            style={{
              textAlign: "center",
              marginTop: 5,
              marginBottom: 5,
            }}
            variant="h6"
          >
            {user.username}
          </Typography>

          <Typography
            style={{
              textAlign: "center",
              marginBottom: 5,
            }}
            variant="subtitle1"
          >
            {user.role}
          </Typography>


				</div>
				<Divider />
				<List>
					{routes.map((item, index) => (
						<ListItem
							key={index}
							disablePadding
							sx={{ display: "block" }}
						>
							<ListItemButton
								component={Link}
								to={item.path}
								sx={{
									minHeight: 48,
									justifyContent: open
										? "initial"
										: "center",
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									primary={item.name}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
				<List
					sx={{
						position: "absolute",
						bottom: 0,
						width: "100%",
						top: "auto",
					}}
				>
					<ListItem
						disablePadding
						sx={{ display: "block" }}
						onClick={() => {
							localStorage.clear();
							navigate("/");
						}}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open
									? "initial"
									: "center",
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText
								primary={"Se deconnecter"}
								sx={{ opacity: open ? 1 : 0 }}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Routes path={"/dashboar/*"}>
					<Route path={"/users"} element={<Users />} />
					<Route path={"/candidat"} element={<Candidat />} />
					<Route path={"/votes"} element={<Votes />} />
				</Routes>
			</Box>
		</Box>
	);
}
