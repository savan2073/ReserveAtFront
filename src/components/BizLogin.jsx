import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../axiosConfig.js";
import bizregillu from "../assets/images/bizregillu.jpg"
import '../styles/BizLogin.css';


function BizLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function login(event) {
        event.preventDefault();
        try {
            await axiosInstance.post(`/api/business/login`, {
                email: email,
                password: password,
            }).then((res) =>{
                console.log(res.data);
                if (res.data.message === "Email does not exist") {
                    alert("Email does not exist");
                } else if (res.data.message === "Login success" && res.data.token) {
                    localStorage.setItem("jwtToken", res.data.token);
                    localStorage.setItem("businessId", res.data.userId);
                    localStorage.setItem("role", res.data.role);
                    navigate('/business-dashboard');
                } else {
                    alert("Incorrect Email and Password not match");
                }
            }, fail => {
                console.error(fail);
            })
        } catch (err) {
            alert(err);
        }
    }

    const handleBizRegisterClick = () => {
        navigate('/biz/register');
    }

    return (
        <div className="main-container">
            <div className="grouped-container">
                {/* Możesz tutaj dodać inną ilustrację dla biznesu */}
                <div className="illustration">
                    <img src={bizregillu} alt="business illustration" />
                </div>

                {/* Formularz logowania biznesowego */}
                <div className="signup-form">
                    <h2>Business Sign in</h2>
                    <form onSubmit={login}>
                        {/* Pole wejściowe dla emaila */}
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="Enter Business Email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>

                        {/* Pole wejściowe dla hasła */}
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                placeholder="Enter Password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </div>

                        {/* Przycisk logowania */}
                        <button type="submit">Log in</button>
                    </form>

                    {/* Link do rejestracji biznesu */}
                    <div className="create-account">
                        <a onClick={handleBizRegisterClick}>Create a business account</a>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BizLogin;