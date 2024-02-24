import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/SearchBar.css"

const SearchBar = () => {
    const [city, setCity] = useState('BIAŁYSTOK');
    const [businessType, setBusinessType] = useState('FRYZJER');
    const [citiesOptions, setCitiesOptions] = useState([]);
    const [businessTypesOptions, setBusinessTypesOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/cities");
                setCitiesOptions(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania miast', error);
            }
        };

        const fetchBusinessTypes = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/businessTypes");
                setBusinessTypesOptions(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania rodzajów biznesu', error);
            }
        };

        fetchCities();
        fetchBusinessTypes();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?city=${city}&type=${businessType}`);
    };

    return (
        <form onSubmit={handleSearch} className="search-form">
            <select
                className="search-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            >
                {citiesOptions.map((cityOption, index) => (
                    <option key={index} value={cityOption}>
                        {cityOption}
                    </option>
                ))}
            </select>

            <select
                className="search-select"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
            >
                {businessTypesOptions.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <button className="search-button" type="submit">Szukaj</button>
        </form>
    );
};

export default SearchBar;
