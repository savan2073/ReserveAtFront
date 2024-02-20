import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ReviewDialog = ({ open, onClose, onSubmit, bookingId, businessId }) => {
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        onSubmit({ bookingId, businessId, rating, content });
        onClose(); // Zamknij dialog
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Wystaw recenzję</DialogTitle>
            <DialogContent>
                <TextField
                    label="Ocena"
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Komentarz"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Anuluj</Button>
                <Button onClick={handleSubmit}>Wystaw</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewDialog;