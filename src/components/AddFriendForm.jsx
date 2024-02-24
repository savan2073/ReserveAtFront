import axiosInstance from "../../axiosConfig.js";
import {useState} from "react";
import "../styles/AddFriendForm.css"

const AddFriendForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/friendship/add', {
                friendFirstName: firstName,
                friendLastName: lastName
            });
            alert('Znajomy został dodany.');
            // Możesz tutaj odświeżyć listę znajomych lub wyczyścić formularz
        } catch (error) {
            console.error('Nie udało się dodać znajomego:', error);
            alert('Nie udało się dodać znajomego. Spróbuj ponownie.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-friend-form">
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Imię znajomego"
                required
                className="add-friend-input"
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nazwisko znajomego"
                required
                className="add-friend-input"
            />
            <button type="submit" className="add-friend-submit">Dodaj znajomego</button>
        </form>
    );
};

export default AddFriendForm;