import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

export default function ConfirmationDialogue(props) {
    const {onClose, value: valueProp, open, content, title, ...other} = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (<Dialog
        sx={{'& .MuiDialog-paper': {width: '80%'}}}
        maxWidth="xs"
        TransitionProps={{onEntering: handleEntering}}
        open={open}
        {...other}
    >
        <DialogTitle
            sx={{
                margin: 'auto'
            }}
        >{title}</DialogTitle>
        <DialogContent dividers>
            {content}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel}
                    color="error"
                    fullWidth
                    sx={{
                        textTransform: 'none', margin: 'auto 2vh'
                    }}
            >
                Fermer
            </Button>
        </DialogActions>
    </Dialog>);
}

ConfirmationDialogue.propTypes = {
    onClose: PropTypes.func.isRequired, open: PropTypes.bool.isRequired, value: PropTypes.string.isRequired,
};