// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import axios from "axios";

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


    return(
        <div className="container mt-4">
            <div className="card">
                <h1>Rejestracja Firmy</h1>
                <form>
                    {/*company name*/}
                    <div className="form-group">
                        <label>Nazwa Firmy</label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyName"
                            placeholder="Wpisz nazwę firmy"
                            value={companyName}
                            onChange={(event) => setCompanyName(event.target.value)}
                        />
                    </div>
                    {/*business type*/}
                    <div className="form-group">
                        <label>Typ Działalności</label>
                        <select
                            className="form-control"
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                        >
                            {businessTypesOptions.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/*city*/}
                    <div className="form-group">
                        <label>Miasto</label>
                        <select
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            {citiesOptions.map((cityOption, index) => (
                                <option key={index} value={cityOption}>
                                    {cityOption}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/*Address*/}
                    <div className="form-group">
                        <label>Adres</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Wpisz adres"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>
                    {/*Email*/}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Wpisz email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    {/*password*/}
                    <div className="form-group">
                        <label>Hasło</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Wpisz hasło"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                    </div>

                    {/*Description*/}
                    <div className="form-group">
                        <label>Opis</label>
                        <textarea
                            className="form-control"
                            id="description"
                            placeholder="Wpisz opis"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        ></textarea>
                    </div>
                    {/*File Upload for PhotoPath*/}
                    <div className="form-group">
                        <label>Zdjęcie</label>
                        <input
                            type="file"
                            className="form-control"
                            id="photoPath"
                            accept=".jpg, .jpeg"
                            onChange={handleFileChange}
                        />
                    </div>
                    {/*Save Button*/}
                    <button type="submit" className="btn btn-primary mt-4" onClick={save}>Zapisz</button>
                </form>
            </div>
        </div>

    );

}

export default BizRegister;