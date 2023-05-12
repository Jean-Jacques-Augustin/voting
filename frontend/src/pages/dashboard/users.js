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
import AddUser from "../../components/users/addUsers";
import {getData} from "../../middleware/connexionBack";
import Typography from "@mui/material/Typography";


export default function Users() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Dione');
    const [data, setData] = React.useState([]);


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData('users');
                setData(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()

    }, [open])


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
            Utilisateurs :
        </Typography>
        <br/>
        <Paper sx={{width: '100%', mb: 12}}>

            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Numéro de vote</b></TableCell>
                            <TableCell><b>Nom et prénom</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Adresse</b></TableCell>
                            <TableCell><b>Role</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (<TableRow key={row._id}>
                            <TableCell>{row.num_vote}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>{row.role}</TableCell>
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
                id="ringtone-menu"
                keepMounted
                open={open}
                onClose={handleClose}
                content={<AddUser/>}
                title={'Ajouter un utilisateur'}
                value={value}
            />
        </Paper>
    </div>);
}
