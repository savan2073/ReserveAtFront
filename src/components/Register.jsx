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
            <h2>Sign up</h2>
            <input type="text"
                   className="form-control"
                   id="firstName"
                   placeholder="Enter First Name"
                   value={firstName}
                   onChange={(event) => {
                       setFirstName(event.target.value);
                   }} />
            <input type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(event) => {
                    setLastName(event.target.value);
                }}
            />
            <input type="email"
                   className="form-control"
                   id="email"
                   placeholder="Enter Email"
                   value={email}
                   onChange={(event) => {
                       setEmail(event.target.value);
                   }} />
            <input type="password"
                   className="form-control"
                   id="password"
                   placeholder="Enter Password"
                   value={password}
                   onChange={(event) => {
                       setPassword(event.target.value);
                   }} />
            <input type="password" placeholder="Repeat your password" />
            <input type="text"
                   className="form-control"
                   id="phoneNumber"
                   placeholder="Enter Phone Number"
                   value={phoneNumber}
                   onChange={(event) => {
                       setPhoneNumber(event.target.value);
                   }} />
            <div className="terms">
                <input type="checkbox" id="termsOfService" />
                <label htmlFor="termsOfService">I agree all statements in Terms of service</label>
            </div>
            <button type="submit" className="RegisterButton" onClick={save}>Register</button>
            <p className="member" onClick={handleLoginClick}>I am already member</p>
        </form>
        <div className="signup-image">
            {/* Here you would insert your desk image */}
            <img src={barber} alt="Workspace" />
        </div>
        </div>
    </div>
);


}

export default Register;