import React, {useState} from "react";

function BizRegister() {
    const [companyName, setCompanyName] = useState("");
    const [city, setCity] = useState();
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [businessType, setBusinessType] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [] = useState();


    return(
        <div className="container mt-4">
            <div className="card">
                <h1>User Registration</h1>
                <form>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(event) => {
                                setFirstName(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(event) => {
                                setPhoneNumber(event.target.value);
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4" onClick={save}>Save</button>
                </form>
            </div>
        </div>
</div>
    );

}

export default BizRegister;