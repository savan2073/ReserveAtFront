import {useEffect, useState} from "react";
import axiosInstance from "../../axiosConfig.js";
import "../styles/ManageWorkingHours.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
function ManageWorkingHours() {
    const businessId = localStorage.getItem('businessId');
    const [workingHours, setWorkingHours] = useState({
        monday: { open: '09:00', close: '17:00' },
        tuesday: { open: '09:00', close: '17:00' },
        wednesday: { open: '09:00', close: '17:00' },
        thursday: { open: '09:00', close: '17:00' },
        friday: { open: '09:00', close: '17:00' },
        saturday: { open: '09:00', close: '17:00' }
    });

    // Funkcja do obsługi zmian w formularzu
    const handleInputChange = (day, openOrClose, value) => {
        setWorkingHours(prevHours => ({
            ...prevHours,
            [day]: { ...prevHours[day], [openOrClose]: value }
        }));
    };

    // Funkcja do wysyłania danych do backendu
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Konwersja danych do formatu oczekiwanego przez backend
            const hoursData = Object.entries(workingHours).map(([day, hours]) => ({
                dayOfWeek: day.toUpperCase(),
                startTime: hours.open,
                endTime: hours.close,
                businessId: businessId
            }));

            console.log("wysyłane godziny pracy: ", hoursData);

            // Wyślij dane do API
            await axiosInstance.post(`/api/business/${businessId}/working-hours`, hoursData);
            alert('Godziny pracy zostały zaktualizowane');
        } catch (error) {
            console.error('Błąd przy aktualizacji godzin pracy', error);
            alert('Nie udało się zaktualizować godzin pracy');
        }
    };

    const transformWorkingHoursData = (data) => {
        const transformedData = {};
        data.forEach(wh => {
            const day = wh.dayOfWeek.toLowerCase();
            transformedData[day] = {
                open: wh.openTime,
                close: wh.closeTime
            };
        });
        return { ...workingHours, ...transformedData }; // Uzupełnij brakujące dni wartościami domyślnymi
    };


    useEffect(() => {
        axiosInstance.get(`/api/business/${businessId}/working-hours`)
            .then(res => {
                console.log('Odpowiedź z API:', res.data); // Dodaj to, aby zobaczyć odpowiedź z API
                const transformedHours = transformWorkingHoursData(res.data);
                setWorkingHours(transformedHours);
            })
            .catch(error => console.error('Error fetching working hours', error));
    }, [businessId]);


    // Dodaj logikę do dodawania, edytowania i usuwania godzin pracy

    return (
        <div>
            <Header/>
        <div className="manage-working-hours-container">
            <h1 className="manage-working-hours-title">Zarządzaj godzinami pracy</h1>
            <form onSubmit={handleSubmit}>
                {Object.entries(workingHours).map(([day, hours]) => (
                    <div key={day} className="day-container">
                        <h3 className="day-title">{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                        <div className="time-input-container">
                            <label>
                                Otwarcie:
                                <input
                                    type="time"
                                    value={hours.open}
                                    onChange={(e) => handleInputChange(day, 'open', e.target.value)}
                                />
                            </label>
                            <label>
                                Zamknięcie:
                                <input
                                    type="time"
                                    value={hours.close}
                                    onChange={(e) => handleInputChange(day, 'close', e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                ))}
                <button type="submit" className="save-button">Zapisz godziny pracy</button>
            </form>
        </div>
            <Footer/>
        </div>
    );
}

export default ManageWorkingHours;