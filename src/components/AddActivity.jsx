
import {useNavigate, useParams} from 'react-router-dom';
import {useState} from "react";
import axiosInstance from "../../axiosConfig.js";

const AddActivity = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState({
        activityName: '',
        description: '',
        price: 0,
        durationOfTreatment: '' //założenie że string, np. 1h
    });

    const handleChange = (e) => {
        const value = e.target.name === "durationOfTreatment" ? parseInt(e.target.value) : e.target.value;
        setActivity({...activity, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`/api/activities/add/${employeeId}`, activity);
            alert('Activity dodane pomyślnie');
            navigate('/business-dashboard');
        } catch (error) {
            console.error('Błąd podczas dodawania activity', error);
            alert('Wystąpił błąd');
        }
    }

    // Tutaj możesz dodać logikę formularza do dodawania activity

    return (
        <div>
            <h1>Dodaj Activity dla Pracownika {employeeId}</h1>
            {/* Formularz dodawania activity */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nazwa aktywności</label>
                    <input type="text" name="activityName" value={activity.activityName} onChange={handleChange} />
                </div>
                <div>
                    <label>Opis</label>
                    <textarea name="description" value={activity.description} onChange={handleChange} />
                </div>
                <div>
                    <label>Cena</label>
                    <input type="number" name="price" value={activity.price} onChange={handleChange} />
                </div>
                <div>
                    <label>Czas trwania w minutach</label>
                    <input type="number" name="durationOfTreatment" value={activity.durationOfTreatment} onChange={handleChange} />
                </div>
                <button type="submit">Dodaj Activity</button>
            </form>
        </div>
    );
};

export default AddActivity;
