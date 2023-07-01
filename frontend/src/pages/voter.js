import {
    Typography, Grid, Container, Box, AppBar, Toolbar, Button,
} from "@mui/material";
import React, {useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import VoterBox from "./../components/VoterBox";
import NavControl from "./../components/NavControl";
import {baseUrl, getData} from "../middleware/connexionBack";


export default function Voter() {
    const [voters, setVoters] = React.useState([]);
    const vote = useSelector((state) => state);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);

    const fetchData = useCallback(async () => {
        try {
            const userData = await getData("users", token);
            const candidateData = await getData("candidates", token);

            const combinedData = candidateData.map((candidate) => {
                const matchingUser = userData.find((user) => user._id === candidate.userId,);
                return {
                    ...matchingUser, ...candidate, _id: candidate._id,
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

        console.log(voteData);
      
        const response = await fetch(`${baseUrl}/createVote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${vote.token}`,
          },
          body: JSON.stringify(voteData),
        });
      
        const data = await response.json();
        console.log(data);
      };


    return (<Box>
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
                            UID={voter._id}
                        />
                    </Grid>))}
                </Grid>

                <Container
                    sx={{
                        float: "right", position: "fixed", bottom: "2rem",
                    }}
                >
                    <Button
                        variant={'contained'}
                        size={"large"}
                        fullWidth
                        onClick={sendVote}
                    >
                        Voter
                    </Button>
                </Container>
            </div>
        </Container>
    </Box>);
}
