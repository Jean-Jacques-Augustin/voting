import { Box, Button, Card } from "@mui/material";
import { useState } from "react";
import CustomTextField from "../components/CustomTextField";

export default function Login() {
  const [formData, setFormData] = useState({
    num_vote: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    num_vote: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des données et gestion des erreurs
    let formErrors = {};
    if (!formData.num_vote) {
      formErrors.num_vote = "Veuillez entrer votre numéro de vote";
    }
    if (!formData.password) {
      formErrors.password = "Veuillez entrer votre mot de passe";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log(formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 400, padding: "2vh" }}>
        <h1>Connexion</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <CustomTextField
            label="Numéro de vote"
            name="num_vote"
            type="text"
            value={formData.num_vote}
            onChange={handleInputChange}
            error={errors.num_vote}
            helperText={errors.num_vote}
          />
          <CustomTextField
            label="Mot de passe"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            helperText={errors.password}
          />
          <Button variant="contained" type="submit" color="primary">
            Se connecter
          </Button>
          <Button variant="outlined" color="error">
            Créer un compte ?
          </Button>
        </form>
      </Card>
    </Box>
  );
}
