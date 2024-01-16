import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "../styles/BusinessPage.css"


const BusinessPage = () => {
    const {businessName, city} = useParams();
    const [businessDetails, setBusinessDetails] = useState(null);
    const [workingHours, setWorkingHours] = useState([]);


    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await fetch(`/api/business/${encodeURIComponent(city)}/${encodeURIComponent(businessName)}`);
                if (!response.ok) {
                    throw new Error('Problem z pobraniem danych biznesu');
                }
                const data = await response.json();
                console.log(data);
                setBusinessDetails(data);

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


    if (!businessDetails) {
        return <div>Ładowanie danych biznesu...</div>
    }

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
                                    <button className="service-button">Umów</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="side-column">
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
        </div>
    );

}

export default BusinessPage;