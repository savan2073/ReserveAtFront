import PropTypes from "prop-types";
import '../styles/BusinessSearchResult.css';
import {useNavigate} from "react-router-dom";

const BusinessSearchResult = ({ business }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        const path  = `/business/${encodeURIComponent(business.city)}/${encodeURIComponent(business.businessName)}`;
        navigate(path);
    }
    return (
        <div className="business-card-container" onClick={handleRedirect}>
            <div className="business-card-result">
                <div className="business-card-header">
                    <img src={business.photoPath} alt={business.businessName} className="business-logo" />
                    <div className="business-info">
                        <h2 className="business-name">{business.businessName}</h2>
                        <div className="business-rating">Rating: {business.rating}</div>
                        <div className="business-description">{business.description}</div>
                    </div>
                </div>
                {/* Inne informacje o biznesie, jeśli są potrzebne */}
            </div>
        </div>
    );
};

BusinessSearchResult.propTypes = {
    business: PropTypes.shape({
        businessName: PropTypes.string.isRequired,
        description: PropTypes.string,
        rating: PropTypes.number,
        photoPath: PropTypes.string,
        city: PropTypes.string,
    }).isRequired
};

export default BusinessSearchResult;
