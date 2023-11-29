import React, { useState } from "react";
import axios from "axios";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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
        } catch (err) {
            alert(err);
        }
    }

    return (
    <div>
        <div class="container mt-4">
            <div class="card">
                <h1>Student Registration</h1>
                <form>
                    <div class="form-group">
                        <label>First Name</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="firstName" 
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(event) => {
                                setFirstName(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="lastName" 
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            class="form-control" 
                            id="email" 
                            placeholder="Enter Email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            class="form-control" 
                            id="password" 
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="phoneNumber" 
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(event) => {
                                setPhoneNumber(event.target.value);
                            }}
                        />
                    </div>
                    <button type="submit" class="btn btn-primary mt-4" onClick={save}>Save</button>
                </form>
            </div>
        </div>
    </div>
);

  
}

export default Register;