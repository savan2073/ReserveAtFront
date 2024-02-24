import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "../styles/Footer.css"

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h4>O nas</h4>
                <p>Kilka słów o naszej działalności i wartościach.</p>
                <div className="footer-section">
                    <h4>Śledź nas</h4>
                    <div className="social-icons">
                        <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
                        <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                        <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Kontakt</h4>
                    <p>email@example.com</p>
                    <p>+48 123 456 789</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;


