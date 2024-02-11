import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import PropTypes from "prop-types";


const localizer = momentLocalizer(moment);

const EmployeeBookingsCalendar = ({ bookings }) => {
    const events = bookings.map((booking) => {
        return {
            start: new Date(booking.bookingDate + 'T' + booking.startTime),
            end: new Date(booking.bookingDate + 'T' + booking.endTime),
            title: booking.activityName || 'Rezerwacja',
        };
    });

    return(
        <div style={{height: 700}}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
            />
        </div>
    );
};


EmployeeBookingsCalendar.propTypes = {
    bookings: PropTypes.arrayOf(PropTypes.shape({
        bookingDate: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        activityName: PropTypes.string,
    })).isRequired,
};

export default EmployeeBookingsCalendar;