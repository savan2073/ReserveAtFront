import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";


const BusinessPage = () => {
    const {businessName, city} = useParams();
    const [businessDetails, setBusinessDetails] = useState(null);

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await fetch(`/api/business/${encodeURIComponent(city)}/${encodeURIComponent(businessName)}`);
                if (!response.ok) {
                    throw new Error('Problem z pobraniem danych biznesu');
                }
                const data = await response.json();
                console.log(data)
                setBusinessDetails(data);
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
        <div></div>
    );

}

export default BusinessPage;