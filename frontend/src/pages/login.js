import { Box, Button, Card } from "@mui/material";
import { useState } from "react";
import CustomTextField from "../components/CustomTextField";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../middleware/connexionBack";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setIsLogged,
  setNumVote,
  setRole,
  setToken,
  setUsername,
  setVerified,
} from "../store/userSlice";
import { useNavigate } from "react-router-dom";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendLoginRequest = async () => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        num_vote: formData.num_vote,
        password: formData.password,
      });

      console.log(response);

      if (response.data.token) {
        const { token, user } = response.data;
        dispatch(setToken(token));
        dispatch(setUsername(user.name));
        dispatch(setRole(user.role));
        dispatch(setNumVote(user.numvote));
        dispatch(setIsLogged(true));
        dispatch(setEmail(user.email));
        dispatch(setVerified(true));
        navigate("/voter");
      } else {
        setErrors("Une erreur s'est produite lors de la connexion.");
      }
    } catch (error) {
      setErrors("Une erreur s'est produite lors de la connexion.");
    }
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
    sendLoginRequest();
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
          <Button
            variant="outlined"
            color="error"
            component={Link}
            to="/signup"
          >
            Créer un compte ?
          </Button>
        </form>
      </Card>
    </Box>
  );
}
