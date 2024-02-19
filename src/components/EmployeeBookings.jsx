import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Styl kalendarza
import axiosInstance from "../../axiosConfig.js";

const localizer = momentLocalizer(moment);

const EmployeeBookings = () => {
    const { employeeId } = useParams();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axiosInstance.get(`/api/bookings/${employeeId}`);
                const bookingsData = response.data.map(booking => ({
                    title: booking.activityName, // Przykładowe przypisanie, dostosuj do swojego modelu danych
                    start: new Date(booking.bookingDate + 'T' + booking.startTime),
                    end: moment(new Date(booking.bookingDate + 'T' + booking.startTime)).add(booking.duration, 'minutes').toDate(),
                }));
                console.log(response.data);
                setBookings(bookingsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (employeeId) {
            fetchBookings();
        }
    }, [employeeId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Rezerwacje dla pracownika {employeeId}</h2>
            <ul>
                {bookings.map((booking, index) => (
                    <li key={index}>
                        Data rezerwacji: {moment(booking.start).format('YYYY-MM-DD')}<br />
                        Początek: {moment(booking.start).format('HH:mm')}<br />
                        Czas trwania: {moment(booking.end).diff(moment(booking.start), 'minutes')} minut<br />
                    </li>
                ))}
            </ul>
            <Calendar
                localizer={localizer}
                events={bookings}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: 1000 }}
            />
        </div>
    );
}



export default EmployeeBookings;
