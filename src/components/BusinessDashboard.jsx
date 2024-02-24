import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig.js';
import BusinessEditDialog from './BusinessEditDialog.jsx';
import ActivityEditDialog from "./ActivityEditDialog.jsx";
import BusinessLocation from "./BusinessLocation.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import "../styles/BusinessDashboard.css";

function BusinessDashboard() {
    const [businessDetails, setBusinessDetails] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const navigate = useNavigate();

    const [editActivityDialogOpen, setEditActivityDialogOpen] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);

    const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

    useEffect(() => {
        // Zakładając, że /api/business/details zwraca szczegóły biznesu wraz z pracownikami i ich aktywnościami
        axiosInstance.get('/api/business/details')
            .then(res => {
                setBusinessDetails(res.data);
            })
            .catch(error => console.error('Error fetching business data', error));
    }, []);

    const handleEditBusinessClick = () => setEditDialogOpen(true);

    const handleEditActivityClick = (activity) => {
        setCurrentActivity(activity);
        setEditActivityDialogOpen(true);
    };


    const handleUpdateActivity = async (updatedActivity) => {
        try {
            // Wstawienie ID aktywności do URLa
            const response = await axiosInstance.put(`/api/activities/${updatedActivity.id}`, updatedActivity);
            console.log('Aktualizacja aktywności: ', response.data);

            // Aktualizacja stanu, jeśli potrzebujesz odświeżyć listę aktywności po zmianach
            // Może wymagać dodatkowego zapytania do API, aby odświeżyć dane, lub aktualizacji stanu lokalnego
            setCurrentActivity(response.data);
            setEditActivityDialogOpen(false); // Zamknięcie dialogu po pomyślnej aktualizacji
            window.location.reload();
        } catch (error) {
            console.error('Błąd podczas aktualizacji aktywności:', error);
            // Opcjonalnie: obsługa błędów, np. wyświetlenie komunikatu o błędzie
        }
    };

    const handleDeleteActivity = async (activityId) => {
        try {
            await axiosInstance.delete(`/api/activities/${activityId}`);
            console.log('Usunięto aktywność: ', activityId);

            window.location.reload();
        } catch (error) {
            console.error('Błąd podczas usuwania aktywności: ', error);
        }
    }

    const handleUpdateBusiness = async (updatedBusinessDetails) => {
        try {
            const response = await axiosInstance.put(`/api/business/${businessDetails.businessId}`, updatedBusinessDetails);
            setBusinessDetails(response.data);
            setEditDialogOpen(false);
        } catch (error) {
            console.error('Error updating business', error);
        }
    };
    const saveLocation = async (location) => {
        try {
            await axiosInstance.put(`/api/business/${businessDetails.businessId}/location`, {
                latitude: location.lat,
                longitude: location.lng
            });
            alert('Location updated successfully');
            // Optional: refresh business details to show updated location
        } catch (error) {
            console.error('Error updating location:', error);
            alert('Failed to update location');
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('businessId');
        localStorage.removeItem('role');
        navigate('/');
    };

    if (!businessDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="dashboard-container">
                <h1 className="dashboard-header">Business Dashboard</h1>
                <div className="business-details">
                    <h2>{businessDetails.businessName}</h2>
                    <p className="business-info">City: {businessDetails.city}</p>
                    <p className="business-info">Address: {businessDetails.address}</p>
                    <p className="business-info">Email: {businessDetails.email}</p>
                    <button className="dashboard-button" onClick={handleEditBusinessClick}>Edytuj</button>
                    {editDialogOpen && (
                        <BusinessEditDialog
                            open={editDialogOpen}
                            onClose={() => setEditDialogOpen(false)}
                            businessDetails={businessDetails}
                            onUpdateBusiness={handleUpdateBusiness}
                        />
                    )}
                </div>
                <button className="dashboard-button" onClick={() => navigate('/manage-working-hours')}>Zarządzaj godzinami pracy</button>
                <button className="dashboard-button" onClick={() => setIsLocationDialogOpen(true)}>Zaznacz lokalizację salonu na mapie</button>
                <button className="dashboard-button" onClick={() => navigate('/add-employee')}>Dodaj pracownika</button>

                <h2>Pracownicy</h2>
                <ul className="employee-list">
                    {businessDetails.employees.map(employee => (
                        <li key={employee.employeeId} className="employee-item">
                            {employee.employeeName} {employee.employeeSurname}
                            <ul>
                                {employee.activities.map(activity => (
                                    <div key={activity.id} className="service-card">
                                        <div className="service-info">
                                            <div className="service-title">{activity.activityName}</div>
                                            <div className="service-time">{activity.durationOfTreatment} min</div>
                                        </div>
                                        <div className="service-booking">
                                            <div className="service-price">{activity.price} zł</div>
                                            <button className="service-button" onClick={() => handleEditActivityClick(activity)}>Edytuj</button>
                                            <button className="service-button" onClick={() => handleDeleteActivity(activity.id)}>Usuń</button>
                                        </div>
                                    </div>
                                ))}
                                {editActivityDialogOpen && (
                                    <ActivityEditDialog
                                        open={editActivityDialogOpen}
                                        onClose={() => setEditActivityDialogOpen(false)}
                                        activity={currentActivity}
                                        onUpdateActivity={handleUpdateActivity}
                                    />
                                )}
                            </ul>
                            <button className="dashboard-button" onClick={() => navigate(`/add-activity/${employee.employeeId}`)}>Dodaj Activity</button>
                            <button className="dashboard-button" onClick={() => navigate(`/employee-bookings/${employee.employeeId}`)}>Zobacz rezerwacje</button>
                        </li>
                    ))}
                </ul>
                <button className="dashboard-button" onClick={() => navigate('/business-messages')}>Zobacz Wiadomości</button>
                <button className="dashboard-button" onClick={handleLogout}>Wyloguj biznes</button>
                {isLocationDialogOpen && (
                    <BusinessLocation
                        open={isLocationDialogOpen}
                        onClose={() => setIsLocationDialogOpen(false)}
                        onSave={(selectedLocation) => {
                            console.log("Zapisana lokalizacja: ", selectedLocation);
                            saveLocation(selectedLocation);
                            setIsLocationDialogOpen(false);
                        }}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
}

export default BusinessDashboard;
