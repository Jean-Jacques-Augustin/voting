import {
    Typography,
    Grid,
    Container,
    Box,
    AppBar,
    Toolbar, Button,
} from "@mui/material";
import React, {useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import VoterBox from "./../components/VoterBox";
import NavControl from "./../components/NavControl";
import {getData} from "../middleware/connexionBack";

export default function Voter() {
    const [voters, setVoters] = React.useState([]);
    const vote = useSelector((state) => state);
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        try {
            const userData = await getData("users");
            const candidateData = await getData("candidates");

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
        fetchData().then(r => console.log(r));
    }, [fetchData]);

    return (
        <Box>
            <AppBar color="inherit">
                <Toolbar>
                    <Container>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                p: 2,
                            }}
                        >
                            <Typography variant="h6" component="div">
                                Vote électronique > Voter pour un candidat
                            </Typography>
                            <NavControl/>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container>
                <Toolbar/>
                <div>
                    <Grid
                        container
                        spacing={2}
                        justifyContent="start"
                        alignItems="center"
                        sx={{mt: "2rem"}}
                        padding={2}
                    >
                        {voters.map((voter, key) => (
                            <Grid key={key} item xs={12} sm={6} md={6}>
                                <VoterBox
                                    name={voter.name}
                                    parties={voter.party}
                                    description={voter.description}
                                    imageUrl={voter.imageUrl}
                                    id={voter._id}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Container
                        sx={{
                            float: "right",
                            position: "fixed",
                            bottom: "2rem",
                        }}
                    >
                        <Button
                            variant={'contained'}
                            size={"large"}
                            fullWidth
                        >
                            Voter
                        </Button>
                    </Container>
                </div>
            </Container>
        </Box>
    );
}
