import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "../styles/BusinessPage.css"
import BookingDialog from "./BookingDialog.jsx";
import axiosInstance from "../../axiosConfig.js";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '200px'
};

const BusinessPage = () => {
    const {businessName, city} = useParams();
    const [businessDetails, setBusinessDetails] = useState(null);
    const [workingHours, setWorkingHours] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const navigate = useNavigate();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBWiRPMfvXXUEXXcYE4C-xCyYSLUKXy0DI" // Wstaw swój klucz API
    })

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await fetch(`/api/business/${encodeURIComponent(city)}/${encodeURIComponent(businessName)}`);
                if (!response.ok) {
                    throw new Error('Problem z pobraniem danych biznesu');
                }
                const data = await response.json();
                console.log(data);
                // Dodanie employeeId do każdej aktywności
                const employeesWithActivityIds = data.employees.map(employee => ({
                    ...employee,
                    activities: employee.activities.map(activity => ({
                        ...activity,
                        employeeId: employee.employeeId
                    }))
                }));

                setBusinessDetails({ ...data, employees: employeesWithActivityIds });



                //dodatkowe żądanie dla godzin pracy
                const hoursResponse = await fetch(`/api/business/${data.businessId}/working-hours`);
                if (!hoursResponse.ok) {
                    throw new Error('Problem z pobraniem godzin pracy');
                }
                const hoursData = await hoursResponse.json();
                setWorkingHours(hoursData);

            } catch (error) {
                console.error('Wystąpił błąd:', error);
                // Tutaj możesz ustawić stan dla błędu, aby wyświetlić informację użytkownikowi
            }
        };

        if (city && businessName) {
            fetchBusinessDetails();
        }

    }, [city, businessName]);


    useEffect(() => {
        const fetchReviews = async () => {
            if (businessDetails?.businessId) {
                try {
                    const response = await axiosInstance.get(`/api/reviews/business/${businessDetails.businessId}`);
                    console.log("Recenzje to: " + response.data);
                    setReviews(response.data);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            }
        };

        fetchReviews();
    }, [businessDetails?.businessId]);

    if (!businessDetails) {
        return <div>Ładowanie danych biznesu...</div>
    }

    const openDialog = (activity) => {
        //sprawdzanie czy token JWT jest w localStorage
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            //brak tokenu pokazuje komunikat i przekierowuje na stronę logowania
            alert('Musisz się najpierw zalogować, aby umówić wizytę.');
            navigate('/login');
        }
        setSelectedActivity(activity);
        setDialogOpen(true);
    }

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedActivity(null);
    }

    const handleBookingSubmit = async (bookingData, activity) => {
        console.log("Selected activity: ", activity);
        try {
            const userId = localStorage.getItem('userId'); // Pobierz userId z localStorage
            const response = await axiosInstance.post('/api/bookings/create', {
                userId: userId,
                employeeId: activity.employeeId, // Załóżmy, że masz employeeId w danych aktywności
                activityId: bookingData.activityId,
                bookingDate: bookingData.bookingDate,
                startTime: bookingData.bookingTime,
                duration: activity.durationOfTreatment // Załóżmy, że masz duration w danych aktywności
            });
            console.log("Booking data: ", bookingData);


            if (response.status === 201) {
                // Obsługa sukcesu
                console.log('Rezerwacja utworzona pomyślnie', response.data);
            }
        } catch (error) {
            // Obsługa błędów
            console.error('Błąd podczas tworzenia rezerwacji', error);
        }
    }

    const renderMap = () => {
        return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: businessDetails.latitude, lng: businessDetails.longitude }}
                zoom={15}
                options={{
                    zoomControl: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true,
                    draggable: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
            >
                <Marker position={{ lat: businessDetails.latitude, lng: businessDetails.longitude }} />
            </GoogleMap>
        );
    };

    const renderReviews = () => (
        <div className="reviews-section">
            <h2>Recenzje</h2>
            {reviews.map(review => (
                <div key={review.reviewId} className="review">
                    <p>Użytkownik: {review.firstName} {review.lastName}</p>
                    <p>Ocena: {review.rating}</p>
                    <p>Treść: {review.content}</p>
                    <p>Data: {new Date(review.reviewDate).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );


    return (
        <div className="business-page-container">
            <div className="main-column">
                <img src={`/${businessDetails.photoPath}`} alt={businessDetails.businessName} className="business-image" />
                <div className="business-rating">
                    Rating: {businessDetails.rating} ({businessDetails.reviewCount} opinii)
                </div>
                <h2>Usługi</h2>
                {businessDetails.employees.map(employee => (
                    <div key={employee.employeeId} className="employee-services">
                        <h3>{employee.employeeName} {employee.employeeSurname}</h3>
                        {employee.activities.map(activity => (
                            <div key={activity.id} className="service-card">
                                <div className="service-info">
                                    <div className="service-title">{activity.activityName}</div>
                                    <div className="service-time">{activity.durationOfTreatment} min</div>
                                </div>
                                <div className="service-booking">
                                    <div className="service-price">{activity.price} zł</div>
                                    <button className="service-button" onClick={() => openDialog(activity)}>Umów</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                {renderReviews()}
            </div>
            <div className="side-column">
                <div className="send-message">
                    {localStorage.getItem('jwtToken') && (
                        <button
                            className="send-message-button"
                            onClick={() => navigate('/send-message', { state: { receiverBusinessId: businessDetails.businessId } })}

                                >
                            Wyślij Wiadomość
                        </button>
                    )}
                </div>
                <h3>Lokalizacja:</h3>
                <div className="map-container">
                    {isLoaded && businessDetails.latitude && businessDetails.longitude && renderMap()}
                    <p>Miasto: {businessDetails.city}</p>
                    <p>Adres: {businessDetails.address}</p>
                </div>
                <h3>Pracownicy</h3>
                {/* Tutaj wypisz pracowników */}
                {businessDetails.employees.map(employee => (
                    <div key={employee.employeeId} className="employee-card">
                        {employee.employeeName} {employee.employeeSurname}
                    </div>
                ))}
                <h3>Godziny pracy</h3>
                <div className="business-hours">
                    {workingHours.map(hour => (
                        <div key={hour.dayOfWeek} className="working-hour">
                            <strong>{hour.dayOfWeek}</strong>: {hour.startTime.slice(0, 5)} - {hour.endTime. slice(0, 5)}
                        </div>
                    ))}
                </div>
            </div>
            {selectedActivity && (
                <BookingDialog
                    open={dialogOpen}
                    onClose={closeDialog}
                    activity={selectedActivity}
                    onSubmit={(bookingData) => handleBookingSubmit(bookingData, selectedActivity)}
                    businessHours={workingHours}
                />
            )}

        </div>
    );

}

export default BusinessPage;