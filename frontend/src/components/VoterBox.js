import React, { useState } from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material';


export const voters = [
     {
       id: 1,
       name: 'John Doe',
       votes: 0,
       parties: 'PDP',
       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
     },
     {
       id: 2,
       name: 'Jane Smith',
       votes: 0,
       parties: 'PDP',
       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
     },
     {
       id: 3,
       name: 'Michael Johnson',
       votes: 0,
       parties: 'PDP',
       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
     },
     {
       id: 4,
       name: 'Emily Davis',
       votes: 0,
       parties: 'PDP',
       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
     },
     {
       id: 5,
       name: 'Daniel Wilson',
       votes: 0,
       parties: 'PDP',
       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
     },
     {
       id: 6,
       name: 'Olivia Martinez',
       votes: 0,
       parties: 'PDP',
       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
     },
     {
       id: 7,
       name: 'William Taylor',
       votes: 0,
       parties: 'PDP',
       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
     },
     {
       id: 8,
       name: 'Sophia Anderson',
       votes: 0,
       parties: 'PDP',
       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
     }
   ];
   



export const VoterBox = (props) => {
  return (
    <Card variant='outlined'>
     <CardContent
          sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               p: 2,
          }}
     >
     <Avatar sx={{ bgcolor: 'success.main', width: 100, height: 100 }}>
          {props.name[0]}
     </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
               <Typography variant='h5' component='div'>
                    {props.name}
               </Typography>
               <Typography variant='body2' component='div'>
                    {props.parties}
               </Typography>
               <Typography variant='body2' component='div'>
                    {props.description}
               </Typography>
          </Box>
     </CardContent>
     <CardActions>
          <Checkbox checked={true} onChange={() => console.log('hello')}    >
               Voter pour {props.parties}
          </Checkbox>
     </CardActions>
    </Card>
  );
};

export default VoterBox;
