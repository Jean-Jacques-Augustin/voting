import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import ConfirmationDialogue from "../../components/dialogue";
import {getData} from "../../middleware/connexionBack";
import Typography from "@mui/material/Typography";
import AddCandidat from "../../components/candidat/addCandidat";
import {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";


export default function Candidat() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Dione');
    const [data, setData] = React.useState([]);
    const token = useSelector((state) => state.user.token);


    const fetchData = useCallback(async () => {
        try {
            const userData = await getData('users', token);
            const candidateData = await getData('candidates', token);
            
    
            // Combine user and candidate data based on userId
            const combinedData = candidateData.map(candidate => {
                const matchingUser = userData.find(user => user._id === candidate.userId);
                return {
                    ...matchingUser, ...candidate, _id: candidate._id
                };
            });
    
            setData(combinedData);
        } catch (error) {
            console.error(error);
        }
    }, []);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    


    const openDialog = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);
        if (newValue) {
            setValue(newValue);
        }
    };

    return (<div

    >
        <Typography
            variant={"h4"}
            align={'left'}
        >
            Candidats :
        </Typography>
        <br/>
        <Paper sx={{width: '100%', mb: 12}}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Partie</b></TableCell>
                            <TableCell><b>Nom et prénom</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Adresse</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (<TableRow key={row._id}>
                            <TableCell>{row.party}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>{row.description}</TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div
                style={{
                    position: 'fixed', bottom: 16, right: 16, margin: 0,
                }}
            >
                <Fab
                    sx={{
                        position: 'absolute', bottom: 16, right: 16
                    }}
                    aria-label={'dsdsds'}
                    color={'primary'}
                    onClick={openDialog}
                >
                    <AddIcon/>
                </Fab>
            </div>

            <ConfirmationDialogue
                id="pop-up menu"
                keepMounted
                open={open}
                onClose={handleClose}
                content={<AddCandidat/>}
                title={'Ajouter un candidat'}
                value={value}
            />
        </Paper>
    </div>);
}
