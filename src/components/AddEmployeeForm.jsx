import { useState } from 'react';
import axiosInstance from "../../axiosConfig.js";

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Imię pracownika</label>
                <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                />
            </div>
            <div>
                <label>Nazwisko pracownika</label>
                <input
                    type="text"
                    value={employeeSurname}
                    onChange={(e) => setEmployeeSurname(e.target.value)}
                />
            </div>
            {/* Dodaj inne pola formularza, jeśli są potrzebne */}
            <button type="submit">Dodaj pracownika</button>
        </form>
    );
};

export default AddEmployeeForm;
