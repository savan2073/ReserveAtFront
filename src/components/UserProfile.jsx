import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../axiosConfig.js";


const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Wywołanie API do pobrania danych użytkownika przy użyciu axiosInstance
        axiosInstance.get(`/api/users/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }, [userId]);

    const goToMessages = () => {
        navigate(`/user-profile/${userId}/messages`);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/');
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profil Użytkownika</h1>
            {user && (
                <div>
                    <p>ID: {user.userId}</p>
                    <p>Imię: {user.firstName}</p>
                    <p>Nazwisko: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Numer telefonu: {user.phoneNumber}</p>
                    <button onClick={goToMessages}>Wiadomości</button>
                    <br/>
                    <br/>
                    <button onClick={handleLogout}>Wyloguj</button>
                </div>
            )}
        </div>
    );

}

export default UserProfile;