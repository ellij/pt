import React from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', activity: '', duration: '', customer: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const addTraining = () => {
        props.saveTraining(training);
        handleClose()
    }

    return (
        <div>
        <Button style={{margin:10}} variant="outlined" color="primary" onClick={handleClickOpen}>
            Add training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={moment(training.date).toISOString()}
                        onChange={e => handleInputChange(e)}
                        label="Date"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        type="int"
                        fullWidth
                    />  
                    <TextField
                        margin="dense"
                        name="customer"
                        value={training.links}
                        onChange={e => handleInputChange(e)}
                        label="Customer"
                        type="text"
                        fullWidth
                    />                   
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={addTraining} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}