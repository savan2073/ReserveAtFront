import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../axiosConfig.js";
import BusinessEditDialog from "./BusinessEditDialog.jsx";


function BusinessDashboard() {
    const [businessDetails, setBusinessDetails] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/api/business/details')
            .then(res => {
                setBusinessDetails(res.data);
                const businessId = res.data.businessId;
                console.log("Received business details: ", res.data);
                axiosInstance.get(`/api/business/${businessId}/employees`)
                    .then(res => setEmployees(res.data))
                    .catch(error => console.error('Error fetching employees', error));
            })

            .catch(error => {
                console.error('Error fetching business data', error);
            });
    }, []);



    const handleAddEmployeeClick = () => {
        navigate('/add-employee');
    }

    const handleManageWorkingHoursClick = () => {
        // Przekierowanie do strony zarządzania godzinami pracy
        navigate('/manage-working-hours');
    }

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('businessId');
        localStorage.removeItem('role');
        navigate('/');
    }

    // Funkcja otwierająca dialog edycji
    const handleEditClick = () => {
        setEditDialogOpen(true);
    };

    // Funkcja aktualizująca dane biznesu
    const handleUpdateBusiness = async (updatedBusinessDetails) => {
        try {
            const businessId = localStorage.getItem('businessId');
            const response = await axiosInstance.put(`/api/business/${businessId}`, updatedBusinessDetails);
            setBusinessDetails(response.data);
            setEditDialogOpen(false); // Zamknij dialog po pomyślnej aktualizacji
        } catch (error) {
            console.error('Error updating business', error);
        }
    };

    if (!businessDetails) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h1>Business Dashboard</h1>
            <div>
                <h2>{businessDetails.businessName}</h2>
                <p>City: {businessDetails.city}</p>
                <p>Business Type: {businessDetails.businessType}</p>
                <p>Address: {businessDetails.address}</p>
                <p>Email: {businessDetails.email}</p>
                {/* inny szczegóły biznesu */}
                <button onClick={handleEditClick}>Edytuj</button>
                {editDialogOpen && (
                    <BusinessEditDialog
                        open={editDialogOpen}
                        businessDetails={businessDetails}
                        onClose={() => setEditDialogOpen(false)}
                        onUpdateBusiness={handleUpdateBusiness}
                    />
                )}
            </div>
            <button onClick={handleManageWorkingHoursClick}>Zarządzaj godzinami pracy</button>
            <button onClick={handleAddEmployeeClick}>Dodaj pracownika</button>

            <h2>Pracownicy</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee.employeeId}>
                        {employee.employeeName} {employee.employeeSurname}
                        <button onClick={() => navigate(`/add-activity/${employee.employeeId}`)}>
                            Dodaj Activity
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleLogout}>Wyloguj biznes</button>
        </div>
    );
}


export default BusinessDashboard;