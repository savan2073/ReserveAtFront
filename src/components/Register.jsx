// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import barber from '../assets/images/barber.png';
import "../styles/Register.css";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/users/register", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phoneNumber: phoneNumber
            });
            alert("User registered successfully");
            navigate("/login")
        } catch (err) {
            alert(err);
        }
    }

    return (

    <div className="signup-container">
        <div className="signup-wrapper">
        <form className="signup-form">
            <h2>Zarejestruj się</h2>
            <input type="text"
                   className="form-control"
                   id="firstName"
                   placeholder="Imię"
                   value={firstName}
                   onChange={(event) => {
                       setFirstName(event.target.value);
                   }} />
            <input type="text"
                className="form-control"
                id="lastName"
                placeholder="Nazwisko"
                value={lastName}
                onChange={(event) => {
                    setLastName(event.target.value);
                }}
            />
            <input type="email"
                   className="form-control"
                   id="email"
                   placeholder="Email"
                   value={email}
                   onChange={(event) => {
                       setEmail(event.target.value);
                   }} />
            <input type="password"
                   className="form-control"
                   id="password"
                   placeholder="Hasło"
                   value={password}
                   onChange={(event) => {
                       setPassword(event.target.value);
                   }} />
            <input type="password" placeholder="Potwierdź hasło" />
            <input type="text"
                   className="form-control"
                   id="phoneNumber"
                   placeholder="Numer telefonu"
                   value={phoneNumber}
                   onChange={(event) => {
                       setPhoneNumber(event.target.value);
                   }} />
            <button type="submit" className="RegisterButton" onClick={save}>Zarejestruj</button>
            <p className="member" onClick={handleLoginClick}>Posiadam już konto</p>
        </form>
        <div className="signup-image">
            <img src={barber} alt="Workspace" />
        </div>
        </div>
    </div>
);


}

export default Register;