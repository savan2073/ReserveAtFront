import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../axiosConfig.js";


function BusinessDashboard() {
    const [businessDetails, setBusinessDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/api/business/details')
            .then(res => {
                setBusinessDetails(res.data);
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
        </div>
    );
}


export default BusinessDashboard;