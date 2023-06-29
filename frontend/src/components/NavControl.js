import React from "react";
import {useSelector} from "react-redux";
import {Tooltip, Avatar, Button, IconButton} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function NavControl() {
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        // Ajoutez ici votre logique de déconnexion
    };

    const getRandomColor = () => {
        const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b",];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (<div>
            {user ? (<div
                    style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1vh",
                    }}
                >
                    <Tooltip title={user.username} arrow>
                        {/**Use random color for avatar */}
                        <Avatar
                            style={{backgroundColor: getRandomColor(), color: "inherit"}}
                            size="large"
                        >
                            {user.username[0]}
                        </Avatar>
                    </Tooltip>

                    {user.role === "admin" && (<Tooltip title={"Dashboard"} arrow>
                            <IconButton aria-label="Administration" size="large" color="inherit">
                                <AdminPanelSettingsIcon fontSize="inherit"/>
                            </IconButton>
                        </Tooltip>)}
                    <Tooltip title={"Quiter"} arrow>
                        <IconButton
                            aria-label="Quitter"
                            size="large"
                            color="error"
                            onClick={handleLogout}
                        >
                            <ExitToAppIcon fontSize="inherit"/>
                        </IconButton>
                    </Tooltip>
                </div>) : (<Tooltip title={"Se connecter"} arrow>
                    <Button variant="outlined" color="primary">
                        Se connecter
                    </Button>
                </Tooltip>)}
        </div>);
}
