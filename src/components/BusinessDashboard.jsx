import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../axiosConfig.js";


function BusinessDashboard() {
    const [businessDetails, setBusinessDetails] = useState(null);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/api/business/details')
            .then(res => {
                setBusinessDetails(res.data);
                const businessId = res.data.businessId;
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

    if (!businessDetails) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h1>Business Dashboard</h1>
            <div>
                <h2>{businessDetails.businessName}</h2>
                <p>City: {businessDetails.city}</p>
                <p>Address: {businessDetails.address}</p>
                <p>Email: {businessDetails.email}</p>
                {/* inny szczegóły biznesu */}
            </div>
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
        </div>
    );
}


export default BusinessDashboard;