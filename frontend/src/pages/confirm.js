import { Box, Card, Typography, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { baseUrl } from "../middleware/connexionBack";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setVerified } from "../store/userSlice"
import { useNavigate } from 'react-router-dom';


function Confirm() {
    const email = useSelector((state) => state.user.email);
    const num_vote = useSelector((state) => state.user.num_vote);

    const isVerified = useSelector((state) => state.user.isVerified);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [code, setCode] = useState('');

    const handleConfirm = async () => {
        const response = await axios.post(`${baseUrl}/verify`, {
            num_vote: num_vote, code: code, email: email
        });
        console.log(response.data);

        if (response.status === 200) {
            dispatch(setVerified(true));
            navigate('/login');
        }

    };


    return (<Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'
    }}

    >
        {
            isVerified ? <Typography variant="h3">Vous êtes déjà vérifié</Typography> :



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
                        label="code"
                        id="confirmationCode"
                        variant="outlined"
                        type="text"
                        inputProps={{
                            maxLength: 6, style: {
                                height: '32px', textAlign: 'center', fontSize: '40px'
                            }
                        }}
                        sx={{ marginTop: '1rem' }}
                        fullWidth
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '1rem' }}
                        fullWidth
                        onClick={handleConfirm}
                    >
                        Confirmer
                    </Button>
                </Card>
        }
    </Box>)
}

export default Confirm;
