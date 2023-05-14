import { Box, Card, Typography, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function Confirm() {
    const email = useSelector(state => state.email);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: 400, padding: '2vh' }}>
                <Typography variant="h3">Confirmation</Typography>

                <Typography variant="body1">
                    Notre équipe va vérifier votre inscription et vous envoyer un mail de confirmation sur votre adresse mail ({email})
                </Typography>

                <TextField
                    id="confirmationCode"
                    variant="outlined"
                    type="text"
                    inputProps={{ maxLength: 6, style: { height: '32px', textAlign: 'center' } }}
                    sx={{ marginTop: '1rem' }}
                />
            </Card>
        </Box>
    )
}

export default Confirm;
