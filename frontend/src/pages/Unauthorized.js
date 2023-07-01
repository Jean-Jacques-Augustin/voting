import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Autorisation requise
        </Typography>
        <Typography variant="subtitle1">
          Vous devez vous <Link
            to="/login"
          >connecter</Link> pour accéder à cette page.
        </Typography>
      </Box>
    </Container>
  );
}
