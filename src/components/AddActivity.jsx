
import {useNavigate, useParams} from 'react-router-dom';
import {useState} from "react";
import axiosInstance from "../../axiosConfig.js";
import "../styles/AddActivity.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

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
            <Header/>
        <div className="add-activity-container">
            <h1 className="add-activity-title">Dodaj Activity dla Pracownika {employeeId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Nazwa aktywności</label>
                    <input className="form-input" type="text" name="activityName" value={activity.activityName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Opis</label>
                    <textarea className="form-textarea" name="description" value={activity.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Cena</label>
                    <input className="form-input" type="number" name="price" value={activity.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Czas trwania w minutach</label>
                    <input className="form-input" type="number" name="durationOfTreatment" value={activity.durationOfTreatment} onChange={handleChange} />
                </div>
                <button className="submit-button" type="submit">Dodaj Activity</button>
            </form>
        </div>
        <Footer/>
        </div>


    );
};

export default AddActivity;
