import {useEffect, useState} from "react";
import axiosInstance from "../../axiosConfig.js";
import "../styles/FriendsList.css";
const FriendsList = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axiosInstance.get('/api/friendship/my-friends');
                setFriends(response.data);
            } catch (error) {
                console.error("Error fetching friends' list", error);
            }
        };

        fetchFriends();
    }, []);

    return (
        <div className="friends-container">
            <h2 className="friends-title">Znajomi</h2>
            <ul className="friends-list">
                {friends.map(friend => (
                    <li key={friend.userId} className="friend-item">
                        <span className="friend-name">{friend.firstName} {friend.lastName}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;