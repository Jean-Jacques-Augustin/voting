import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    Box, Card, Typography, TextField, Button, Snackbar,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {setVerified} from "../store/userSlice";
import {baseUrl} from "../middleware/connexionBack";

function Confirm() {
    const {email, num_vote, isVerified} = useSelector(({user}) => user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    console.log(email, num_vote, isVerified);

    useEffect(() => {
        if (!email) {
            navigate("/signup");
        } else if (isVerified) {
            navigate("/login");
        }
    }, [email, isVerified, navigate]);

    const vote = useSelector((state) => state);

    useEffect(() => {
        if (vote.user.isLogged && vote.user.username) {
            navigate("/voter");
        }
    }, []);

    const handleConfirm = async () => {
        try {
            const response = await axios.post(`${baseUrl}/verify`, {
                num_vote, code, email,
            });

            if (response.status === 200) {
                dispatch(setVerified(true));
                navigate("/login");
            }
        } catch (error) {
            setError("Une erreur s'est produite lors de la confirmation.");
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (<Box
        sx={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column",
        }}
    >
        {isVerified ? (<Typography variant="h3">Vous êtes déjà vérifié</Typography>) : (<Card
            sx={{
                width: 400,
                padding: "2vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "2vh",
            }}
        >
            <Typography variant="h3">Confirmation</Typography>
            <Typography variant="body1">
                Notre équipe va vérifier votre inscription et vous
                envoyer un mail de confirmation sur votre adresse
                mail
                <b>
                    <i>({email})</i>
                </b>
            </Typography>
            <TextField
                label="Code de confirmation"
                id="confirmationCode"
                variant="outlined"
                type="text"
                inputProps={{
                    maxLength: 6, style: {
                        height: "32px", textAlign: "center", fontSize: "20px",
                    },
                }}
                sx={{marginTop: "1rem"}}
                fullWidth
                value={code}
                onChange={(event) => setCode(event.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                sx={{marginTop: "1rem"}}
                fullWidth
                onClick={handleConfirm}
            >
                Confirmer
            </Button>
            <Typography sx={{marginTop: "1rem"}}>
                Vous n'avez pas reçu le code ?{" "}
                <a href="#">Renvoyer le code</a>
            </Typography>
        </Card>)}
        <Typography variant="body1" sx={{marginTop: "1rem"}}>
            Après avoir confirmé votre inscription, vous serez redirigé
            vers la page de connexion et vous pourrez vous connecter et
            voter pour votre candidat préféré.
        </Typography>

        <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            message={error}
        />
    </Box>);
}

export default Confirm;
