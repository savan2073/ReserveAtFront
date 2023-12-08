import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import altLogo from "../assets/images/barber.png"
import "../styles/BusinessCard.css"
import axios from "axios";

const BusinessCard = ({ businessId }) => {
    const [businessDetails, setBusinessDetails] = useState(null);


    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await axios.get(`/api/business/card/${businessId}`);
                setBusinessDetails(response.data);
            } catch (error) {
                console.error('Error fetching business details', error);
            }
        };

        fetchBusinessDetails();
    }, [businessId]);


    if (!businessDetails) {
        return <div>Loading...</div>; // lub jakiś komponent ładowania
    }

    return (
        <div className="business-card">
            <img src={`/${businessDetails.photoPath}`} alt="Business" />
            <div className="rating-box">
                <span className="rating">{businessDetails.rating}</span>
                <span className="review-count">{businessDetails.reviewCount} opinii</span>
            </div>
            <span className="city">{businessDetails.city}</span>
        </div>
    );

};

BusinessCard.propTypes = {
    businessId: PropTypes.number.isRequired,
}

export default BusinessCard;