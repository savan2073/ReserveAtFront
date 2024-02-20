import {useEffect, useState} from "react";
import axiosInstance from "../../axiosConfig.js";


const FriendsReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchFriendReviews = async () => {
            try {
                // Zakładając, że istnieje endpoint /api/reviews/friends
                const response = await axiosInstance.get('/api/reviews/friends');
                console.log(response.data);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching friends' reviews", error);
            }
        };

        fetchFriendReviews();
    }, []);

    return (
        <div>
            <h2>Recenzje znajomych</h2>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review, index) => ( // Używam index jako klucza, ale lepiej byłoby użyć prawdziwego, unikalnego id
                        <li key={index}>
                            <p>Użytkownik: {review.firstName} {review.lastName}</p>
                            <p>Ocena: {review.rating}</p>
                            <p>Treść: {review.content}</p>
                            <p>Data: {review.reviewDate}</p>
                            {/* Możesz chcieć dodać więcej informacji, na przykład o biznesie, którego dotyczy recenzja */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak recenzji znajomych do wyświetlenia.</p>
            )}
        </div>
    );
};

export default FriendsReviews;
