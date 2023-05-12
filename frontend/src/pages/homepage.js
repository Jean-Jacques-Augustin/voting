import {Box, Typography, AppBar, Toolbar, Button, Container, Grid} from '@mui/material';


export default function Homepage() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color={'inherit'} elevation={1}>
                <Container>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h6" component="div">
                            Voting App
                        </Typography>
                        <Button color="inherit">Connexion</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container sx={{mt: '2rem', mb: '2rem', minHeight: '80vh'}}>
                <Grid container justifyContent="center">

                    <Typography variant="h3">
                        Bienvenue sur Voting App
                    </Typography>
                </Grid>
            </Container>
            <Box sx={{bgcolor: 'background.default', height: '15vh'}}>
                <Typography variant="body1" align="center">
                    Votre contenu de pied de page
                </Typography>
            </Box>
        </Box>
    );
}