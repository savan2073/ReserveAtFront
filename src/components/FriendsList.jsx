import {useEffect, useState} from "react";
import axiosInstance from "../../axiosConfig.js";

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
        <div>
            <h2>Moji znajomi</h2>
            <ul>
                {friends.map(friend => (
                    <li key={friend.userId}>{friend.firstName} {friend.lastName}</li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;