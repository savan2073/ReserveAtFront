import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Styl kalendarza
import axiosInstance from "../../axiosConfig.js";
import "../styles/EmployeeBookings.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

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

    const CustomToolbar = ({ onNavigate, onView, label, view }) => {
        const goToToday = () => {
            onNavigate('TODAY');
        };

        const goToBack = () => {
            onNavigate('PREV');
        };

        const goToNext = () => {
            onNavigate('NEXT');
        };

        const changeView = (viewName) => {
            onView(viewName);
        };

        return (
            <div className="toolbar-container">
                <div className="toolbar-row">
                    <button onClick={goToToday}>Dziś</button>
                    <button onClick={goToBack}>Wstecz</button>
                    <button onClick={goToNext}>Naprzód</button>
                </div>
                <div className="toolbar-row">
                    <span className="toolbar-label">{label}</span>
                </div>
                <div className="toolbar-row">
                    <button onClick={() => changeView('day')}>Dzień</button>
                    <button onClick={() => changeView('week')}>Tydzień</button>
                    <button onClick={() => changeView('month')} className={view === 'month' ? 'active' : ''}>Miesiąc</button>
                    <button onClick={() => changeView('agenda')}>Agenda</button>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header/>
        <div className="employee-bookings-container">
            <h2 className="employee-bookings-title">Rezerwacje dla pracownika {employeeId}</h2>
            <ul className="bookings-list">
                {bookings.map((booking, index) => (
                    <li key={index} className="booking-item">
                        Data rezerwacji: {moment(booking.start).format('YYYY-MM-DD')}<br />
                        Początek: {moment(booking.start).format('HH:mm')}<br />
                        Czas trwania: {moment(booking.end).diff(moment(booking.start), 'minutes')} minut<br />
                    </li>
                ))}
            </ul>
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={bookings}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 700 }}
                    components={{
                        toolbar: CustomToolbar
                    }}
                />
            </div>
        </div>
            <Footer/>
        </div>
    );
}



export default EmployeeBookings;
