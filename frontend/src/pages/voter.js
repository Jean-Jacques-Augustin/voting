import { Typography, Grid, Container, Box, AppBar, Toolbar, Button, Snackbar } from "@mui/material";
import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import VoterBox from "./../components/VoterBox";
import NavControl from "./../components/NavControl";
import { baseUrl, getData, postData } from "../middleware/connexionBack";

export default function Voter() {
    const [voters, setVoters] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const vote = useSelector((state) => state);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);

    const fetchData = useCallback(async () => {
        try {
            const userData = await getData("users", token);
            const candidateData = await getData("candidates", token);

            const combinedData = candidateData.map((candidate) => {
                const matchingUser = userData.find(
                    (user) => user._id === candidate.userId,
                );
                return {
                    ...matchingUser,
                    ...candidate,
                    _id: candidate._id,
                };
            });

            setVoters(combinedData);
        } catch (error) {
            console.error(error);
        }
    }, [vote.token, dispatch]);

    useEffect(() => {
        fetchData().then((r) => console.log(r));
    }, [fetchData]);

    // Get the vote data
    const votes = useSelector((state) => state.vote);
    const num_vote = useSelector((state) => state.user.num_vote);
    console.log(votes);

    const sendVote = async () => {
        const candidateIdArray = Object.keys(votes.votes);

        const voteData = {
            num_vote: num_vote,
            candidateId: candidateIdArray,
        };

        const response = await postData("createVote", voteData, token);

        if (response.error) {
            // Afficher le message d'erreur dans le Snackbar
            setSnackbarMessage(response.error);
        } else {
            // Afficher le message de succès dans le Snackbar
            setSnackbarMessage("Votre vote a été enregistré avec succès !");
        }

        // Ouvrir le Snackbar
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMessage("");
    };

    return (
        <Box>
            <Container>
                <Toolbar />

                {voters ? (
                    <div>
                        <Grid
                            container
                            spacing={2}
                            justifyContent="start"
                            alignItems="center"
                            sx={{ mt: "2rem" }}
                            padding={2}
                        >
                            {voters.map((voter, key) => (
                                <Grid
                                    key={key}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                >
                                    <VoterBox
                                        name={voter.name}
                                        parties={voter.party}
                                        description={
                                            voter.description
                                        }
                                        imageUrl={voter.imageUrl}
                                        UID={voter._id}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Container
                            sx={{
                                position: "fixed",
                                bottom: "2rem",
                                left: "50%",
                                transform: "translateX(-50%)",
                                textAlign: "center",
                                maxWidth: "100%",
                                minWidth: "400px",
                            }}
                        >
                            <Button
                                variant={"contained"}
                                size={"large"}
                                fullWidth
                                onClick={sendVote}
                            >
                                Voter
                            </Button>
                        </Container>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "80vh",
                        }}
                    >
                        <Typography variant={"h5"}>
                            Aucun candidat n'est disponible pour le
                            moment. Veuillez réessayer plus tard.
                        </Typography>
                    </div>
                )}

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                />
            </Container>
        </Box>
    );
}
