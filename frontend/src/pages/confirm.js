import {Box, Card, Typography, TextField, Button} from '@mui/material'
import React from 'react'
import {useSelector} from 'react-redux'

function Confirm() {


    const email = useSelector((state) => state.user.email);

    return (<Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'
        }}

        >
            <Card sx={{
                width: 400,
                padding: '2vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Typography variant="h3">Confirmation</Typography>

                <Typography variant="body1">
                    Notre équipe va vérifier votre inscription et vous envoyer un mail de confirmation sur votre adresse
                    mail <b><i>({email})</i></b>
                </Typography>

                <TextField
                    id="confirmationCode"
                    variant="outlined"
                    type="text"
                    inputProps={{
                        maxLength: 6,
                        style: {
                            height: '32px',
                            textAlign: 'center',
                            fontSize: '40px'
                        }}}
                    sx={{marginTop: '1rem'}}
                />

                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    sx={{marginTop: '1rem'}}
                    fullWidth
                >
                    Confirmer
                </Button>

            </Card>
        </Box>)
}

export default Confirm;
