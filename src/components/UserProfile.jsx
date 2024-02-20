import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../axiosConfig.js";
import ReviewDialog from "./ReviewDialog.jsx";
import AddFriendForm from "./AddFriendForm.jsx";
import FriendsList from "./FriendsList.jsx";


const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Wywołanie API do pobrania danych użytkownika przy użyciu axiosInstance
        axiosInstance.get(`/api/users/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });

        axiosInstance.get(`/api/bookings/user/${userId}`)
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => console.error("Error fetching user's bookings", error));
    }, [userId]);

    const goToMessages = () => {
        navigate(`/user-profile/${userId}/messages`);
    };

    const openReviewDialog = (bookingId, businessId) => {
        setSelectedBookingId(bookingId);
        setSelectedBusinessId(businessId);
        setReviewDialogOpen(true);
    }

    const handleReviewSubmit = async (review) => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axiosInstance.post('/api/reviews/add', {
                userId: userId, // Może być potrzebne, jeśli backend wymaga identyfikatora użytkownika
                businessId: review.businessId, // Może być potrzebne, jeśli recenzja jest przypisana do biznesu
                rating: review.rating,
                content: review.content,
                reviewDate: new Date().toISOString().split('T')[0], // Formatowanie daty na format yyyy-mm-dd
            });

            if (response.status === 201) {
                alert('Recenzja została pomyślnie dodana.');
                // Opcjonalnie: odświeżenie danych na stronie lub zamknięcie dialogu
            }
        } catch (error) {
            console.error('Nie udało się dodać recenzji:', error);
            alert('Nie udało się dodać recenzji. Spróbuj ponownie.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/');
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profil Użytkownika</h1>
            {user && (
                <div>
                    <p>ID: {user.userId}</p>
                    <p>Imię: {user.firstName}</p>
                    <p>Nazwisko: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Numer telefonu: {user.phoneNumber}</p>
                    <button onClick={goToMessages}>Wiadomości</button>
                    <br/>
                    <br/>
                    <h2>Twoje rezerwacje</h2>
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking.bookingId}>
                                <p>Salon: {booking.businessName} o id: {booking.businessId}</p>
                                <p>Aktywność: {booking.activityName}</p>
                                <p>Data: {booking.bookingDate}, Start: {booking.startTime}, Koniec: {booking.endTime}</p>
                                {new Date(booking.bookingDate + ' ' + booking.endTime) < new Date() && (
                                    <button onClick={() => openReviewDialog(booking.bookingId, booking.businessId)}>Wystaw recenzję</button>
                                )}
                            </li>
                        ))}
                    </ul>
                    <br/>
                    <br/>
                    <button onClick={handleLogout}>Wyloguj</button>
                    <br/><br/>
                    <AddFriendForm />
                    <FriendsList />
                    <button onClick={() => navigate(`/user-profile/${userId}/friends-reviews`)}>Recenzje znajomych</button>
                </div>
            )}
            <ReviewDialog
                open={reviewDialogOpen}
                onClose={() => setReviewDialogOpen(false)}
                onSubmit={handleReviewSubmit}
                bookingId={selectedBookingId}
                businessId={selectedBusinessId}
            />
        </div>
    );

}

export default UserProfile;