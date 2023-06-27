import React from "react";
import { useSelector } from "react-redux";
import { Chip, Avatar, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function NavControl() {
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    // Ajoutez ici votre logique de déconnexion
  };

  return (
    <div>
      {user ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1vh",
          }}
        >
          <Chip
          size="medium"
            color="success"
            avatar={
              <Avatar color="primary" size="large">
                {user.username[0]}
              </Avatar>
            }
            label={user.username}
          />

          {user.role === "admin" && (
            <IconButton
              aria-label="Administration"
              size="large"
              color="info"
            >
              <AdminPanelSettingsIcon fontSize="inherit" />
            </IconButton>
          )}

          <IconButton
            aria-label="Quitter"
            size="large"
            color="error"
            onClick={handleLogout}
          >
            <ExitToAppIcon fontSize="inherit" />
          </IconButton>
        </div>
      ) : (
        <Button variant="outlined" color="primary">
          Se connecter
        </Button>
      )}
    </div>
  );
}
