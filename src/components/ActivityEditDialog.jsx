import {useState} from "react";
import {Button, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";


const ActivityEditDialog = ({ open, onClose, activity, onUpdateActivity }) => {
    const [editedActivity, setEditedActivity] = useState(activity);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedActivity({ ...editedActivity, [name]: value });
    };

    const handleSubmit = () => {
        onUpdateActivity(editedActivity);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edytuj aktywność</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="activityName"
                    label="Nazwa aktywności"
                    type="text"
                    fullWidth
                    value={editedActivity.activityName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Opis"
                    type="text"
                    fullWidth
                    value={editedActivity.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Cena"
                    type="number"
                    fullWidth
                    value={editedActivity.price}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="durationOfTreatment"
                    label="Czas trwania (min)"
                    type="number"
                    fullWidth
                    value={editedActivity.durationOfTreatment}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Anuluj
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Zapisz
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ActivityEditDialog;