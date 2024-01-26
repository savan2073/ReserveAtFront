import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';

const BookingDialog = ({ open, onClose, activity, onSubmit, businessHours }) => {
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);

    const today = new Date().toISOString().split('T')[0];

    const updateAvailableTimes = (selectedDate) => {
        const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        const dayHours = businessHours.find((day) => day.dayOfWeek === dayOfWeek);

        if (dayHours) {
            let times = [];
            let currentTime = moment(dayHours.startTime, 'HH:mm:ss');

            while (currentTime.isBefore(moment(dayHours.endTime, 'HH:mm:ss'))) {
                times.push(currentTime.format('HH:mm'));
                currentTime.add(15, 'minutes');
            }

            setAvailableTimes(times);
        } else {
            setAvailableTimes([]);
        }
    };

    const handleDateChange = (event) => {
        setBookingDate(event.target.value);
        updateAvailableTimes(event.target.value);
    };

    const handleTimeChange = (event) => {
        setBookingTime(event.target.value);
    };

    const handleBooking = () => {
        onSubmit({
            activityId: activity.id,
            bookingDate,
            bookingTime,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Rezerwacja usługi</DialogTitle>
            <DialogContent>
                <TextField
                    label="Data"
                    type="date"
                    value={bookingDate}
                    onChange={handleDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ min: today }}
                />
                <TextField
                    label="Godzina"
                    type="time"
                    value={bookingTime}
                    onChange={handleTimeChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 900, // 15 minut
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Anuluj
                </Button>
                <Button onClick={handleBooking} color="secondary">
                    Zarezerwuj
                </Button>
            </DialogActions>
        </Dialog>
    );
};

BookingDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    activity: PropTypes.shape({
        id: PropTypes.number.isRequired,
        activityName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        durationOfTreatment: PropTypes.number.isRequired,
        description: PropTypes.string,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    businessHours: PropTypes.arrayOf(
        PropTypes.shape({
            dayOfWeek: PropTypes.string.isRequired,
            startTime: PropTypes.string.isRequired,
            endTime: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default BookingDialog;

