import axiosInstance from "../../axiosConfig.js";
import {useState} from "react";

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Imię znajomego"
                required
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nazwisko znajomego"
                required
            />
            <button type="submit">Dodaj znajomego</button>
        </form>
    );
};

export default AddFriendForm;