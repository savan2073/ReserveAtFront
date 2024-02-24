import {useEffect, useState} from "react";
import axiosInstance from "../../axiosConfig.js";
import "../styles/FriendsReviews.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

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
            <Header/>
        <div className="reviews-container">
            <h2 className="reviews-title">Recenzje znajomych</h2>
            {reviews.length > 0 ? (
                <ul className="reviews-list">
                    {reviews.map((review, index) => ( // Używaj unikalnego ID, jeśli dostępne
                        <li key={index} className="review-item">
                            <p className="review-detail">Użytkownik: {review.firstName} {review.lastName}</p>
                            <p className="review-detail">Ocena: {review.rating}</p>
                            <p className="review-detail">Treść: {review.content}</p>
                            <p className="review-detail">Data: {new Date(review.reviewDate).toLocaleDateString()}</p>
                            {/* Możliwość dodania więcej informacji o biznesie, którego dotyczy recenzja */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-reviews">Brak recenzji znajomych do wyświetlenia.</p>
            )}
        </div>
            <Footer/>
        </div>

    );
};

export default FriendsReviews;
