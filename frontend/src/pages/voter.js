import {Typography, Grid, Container, Button, Box, AppBar, Toolbar} from "@mui/material";
import React, {useEffect} from "react";
import VoterBox from "./../components/VoterBox";
import {getData} from "./../middleware/connexionBack";
import {useSelector} from "react-redux";

export default function Voter() {
    const [voters, setVoters] = React.useState([]);

    // get the candidates states from the store
    const vote = useSelector((state) => state);

    console.log(vote);
    const fetchData = async () => {
        try {
            const userData = await getData("users");
            const candidateData = await getData("candidates");

            // Combine user and candidate data based on userId
            const combinedData = candidateData.map((candidate) => {
                const matchingUser = userData.find((user) => user._id === candidate.userId);
                return {
                    ...matchingUser, ...candidate, _id: candidate._id,
                };
            });

            setVoters(combinedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [voters]);

    return (<Box>
        <AppBar color="inherit">
            <Toolbar>
                <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
                    Voter pour un candidat
                </Typography>
                <Button color="inherit">Login</Button>
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
                    {voters.map((voter, key) => (<Grid key={key} item xs={12} sm={6} md={6}>
                        <VoterBox
                            name={voter.name}
                            parties={voter.party}
                            description={voter.description}
                            imageUrl={voter.imageUrl}
                            id={voter._id}
                        />
                    </Grid>))}
                </Grid>

                <Container
                    sx={{
                        float: "right", position: "fixed", bottom: "2rem",
                    }}
                >
                    Valider
                </Container>
            </div>
        </Container>
    </Box>);
}
