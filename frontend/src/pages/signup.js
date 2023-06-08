import {Box, Button, Card, Typography} from "@mui/material";
import {useState} from "react";
import CustomTextField from "../components/CustomTextField";
import {baseUrl, postData} from "../middleware/connexionBack";
import {useDispatch} from "react-redux";
import {setEmail, setNumVote} from "../store/userSlice";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


export default function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        num_vote: "", password: "", confirmPassword: "",
    });

    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const [errors, setErrors] = useState({
        num_vote: "", password: "", confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation des données et gestion des erreurs
        let formErrors = {};
        if (!formData.num_vote) {
            formErrors.num_vote = "Veuillez entrer votre numéro de vote";
        }
        if (!formData.password) {
            formErrors.password = "Veuillez entrer votre mot de passe";
        }
        if (!formData.confirmPassword) {
            formErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
        }
        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }


        const response = await axios.post(`${baseUrl}/register`, {
            num_vote: formData.num_vote, password: formData.password,
        });

        console.log(response.data);

        if (response.status === 200) {
            dispatch(setEmail(response.data.user.email));
            dispatch(setNumVote(response.data.user.num_vote));
            navigate("/confirm");
        }
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
            <Card sx={{width: 400, padding: "2vh"}}>
                <h1>Inscription</h1>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex", flexDirection: "column", gap: "1rem",
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
                    <CustomTextField
                        label="Confirmez votre mot de passe"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        error={errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                    <Typography variant="body2" color="error">
                        {error && "Erreur lors de l'inscription"}
                    </Typography>

                    <Button variant="contained" type="submit" color="primary">
                        S'inscrire
                    </Button>
                    <Typography variant="body2" color="textSecondary">
                        Vous avez déjà un compte ? <Link to={"/login"}>Connectez-vous</Link>
                    </Typography>
                </form>
            </Card>
        </Box>
    );
}
