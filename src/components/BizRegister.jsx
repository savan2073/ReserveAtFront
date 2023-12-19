// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import axios from "axios";
import bizregillu from "../assets/images/bizregillu.jpg"
import {useNavigate} from "react-router-dom";


function BizRegister() {
    const [companyName, setCompanyName] = useState("");
    const [city, setCity] = useState("BIAŁYSTOK");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [businessType, setBusinessType] = useState("FRYZJER");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState(null);

    const [citiesOptions, setCitiesOptions] = useState([]);
    const [businessTypesOptions, setBusinessTypesOptions] = useState([]);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setPhoto(event.target.files[0]);
        }
    }
    useEffect(() => {
        fetch("http://localhost:8080/api/cities")
            .then(response => response.json())
            .then(data => setCitiesOptions(data));

        fetch("http://localhost:8080/api/businessTypes")
            .then(response => response.json())
            .then(data => setBusinessTypesOptions(data));
    }, []);

    async function save(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('city', city);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('businessType', businessType);
        formData.append('email', email);
        formData.append('password', password);
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            await axios.post("http://localhost:8080/api/business/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("User registered successfully");
        } catch (err) {
            alert(err);
        }
    }

    const handleBizLoginClick = () => {
        navigate('/biz/login');
    }


    return(
        <div className="signup-container">
            <div className="signup-wrapper">
                <form className="signup-form">
                    <h2>Rejestracja Firmy</h2>

                    {/* Company Name */}
                    <input type="text"
                           className="form-control"
                           id="companyName"
                           placeholder="Wpisz nazwę firmy"
                           value={companyName}
                           onChange={(event) => setCompanyName(event.target.value)} />

                    {/* Business Type */}
                    <select className="form-control"
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}>
                        {businessTypesOptions.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    {/* City */}
                    <select className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}>
                        {citiesOptions.map((cityOption, index) => (
                            <option key={index} value={cityOption}>
                                {cityOption}
                            </option>
                        ))}
                    </select>

                    {/* Address */}
                    <input type="text"
                           className="form-control"
                           id="address"
                           placeholder="Wpisz adres"
                           value={address}
                           onChange={(event) => setAddress(event.target.value)} />

                    {/* Email */}
                    <input type="email"
                           className="form-control"
                           id="email"
                           placeholder="Wpisz email"
                           value={email}
                           onChange={(event) => setEmail(event.target.value)} />

                    {/* Password */}
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Wpisz hasło"
                           value={password}
                           onChange={(event) => setPassword(event.target.value)} />

                    {/* Description */}
                    <textarea className="form-control"
                              id="description"
                              placeholder="Wpisz opis"
                              value={description}
                              onChange={(event) => setDescription(event.target.value)}>
            </textarea>

                    {/* File Upload for PhotoPath */}
                    <input type="file"
                           className="form-control"
                           id="photoPath"
                           accept=".jpg, .jpeg"
                           onChange={handleFileChange} />

                    {/* Save Button */}
                    <button type="submit" className="RegisterButton" onClick={save}>Zapisz</button>
                    <p className="member" onClick={handleBizLoginClick}>I am already member</p>
                </form>
                <div className="signup-image">
                    <img src={bizregillu} alt="business register illustration" />
                </div>
            </div>
        </div>

    );

}

export default BizRegister;