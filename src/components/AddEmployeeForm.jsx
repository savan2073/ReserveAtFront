import { useState } from 'react';
import axiosInstance from "../../axiosConfig.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "../styles/AddEmployeeForm.css";

const AddEmployeeForm = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [employeeSurname, setEmployeeSurname] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const businessId = localStorage.getItem('businessId');

        try {
            const response = await axiosInstance.post('/api/employees/add', {
                employeeName,
                employeeSurname,
                businessId
            }, );
            console.log(response.data);
            alert("Pracownik został dodany");
        } catch (error) {
            console.error('Error adding employee', error);
            alert("Wystąpił błąd przy dodawaniu pracownika");
        }
    };

    return (
        <div>
            <Header />
            <div className="add-employee-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Imię pracownika</label>
                        <input
                            className="form-input"
                            type="text"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Nazwisko pracownika</label>
                        <input
                            className="form-input"
                            type="text"
                            value={employeeSurname}
                            onChange={(e) => setEmployeeSurname(e.target.value)}
                        />
                    </div>
                    {/* Dodaj inne pola formularza, jeśli są potrzebne */}
                    <button className="submit-button" type="submit">Dodaj pracownika</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AddEmployeeForm;
