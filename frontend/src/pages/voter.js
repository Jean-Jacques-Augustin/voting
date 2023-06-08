import { Typography, Grid, Container } from '@mui/material';
import React from 'react';
import { voters } from './../components/VoterBox';
import VoterBox from './../components/VoterBox';

export default function Voter() {
  return (
    <Container>
       <div
       style={{
              padding: "2rem",
                marginTop: "2rem",
                marginBottom: "2rem",
       }}
       >
       <Typography variant="h4" align="center" color="primary" gutterBottom>
            Bienvenue sur l'espace pour voter pour votre candidat
        </Typography>
       </div>
      <div>
      <Grid
        container
        spacing={2}
        justifyContent="start"
        alignItems="center"
        sx={{ mt: '2rem' }}
        padding={2}
      
      >
        {voters.map((voter) => (
          <Grid item xs={12} sm={6} md={4} key={voter.id}>
            <VoterBox
              name={voter.name}
              parties={voter.parties}
              description={voter.description}
            />
          </Grid>
        ))}
      </Grid>

    <div>
        <Typography variant="h6" align="center" color="primary" gutterBottom>
            Vous avez voté pour: <b>
                TGV
            </b>
        </Typography>
    </div>

      </div>
    </Container>
  );
}
