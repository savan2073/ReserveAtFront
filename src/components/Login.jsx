import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.css';
import guywithlaptop from '../assets/images/guywithlaptop.jpg';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const autoLogout = (miliseconds) => {
        setTimeout(() => {
            localStorage.clear();
            navigate('/login');
        }, miliseconds)
    }

    async function login(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/api/users/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
             console.log(res.data);
             
             if (res.data.message == "Email does not exist")
             {
               alert("Email does not exist");
             } 
             else if(res.data.message == "Login success" && res.data.token)
             { 
                localStorage.setItem("jwtToken", res.data.token);
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("role", res.data.role);
                autoLogout(30 * 60 * 1000);
                navigate('/');
             } 
              else 
             { 
                alert("Incorrect Email and Password not match");
             }
          }, fail => {
           console.error(fail); // Error!
            });
        }
 
         catch (err) {
          alert(err);
        }
      
      }
    const handleRegisterClick = () => {
        navigate('/register');
    }

    return (
        <div className="main-container">
            <div className="grouped-container">
                {/* Ilustracja użytkownika z laptopem */}
                <div className="illustration">
                    <img src={guywithlaptop} alt="guy with laptop" />
                </div>

                {/* Formularz rejestracji */}
                <div className="signup-form">
                    <h2>Zaloguj się</h2>
                    <form>
                        {/* Pole wejściowe dla nazwy użytkownika/emaila */}
                        <div className="input-field">
                            <label htmlFor="email">Email użytkownika</label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="Email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>

                        {/* Pole wejściowe dla hasła */}
                        <div className="input-field">
                            <label htmlFor="password">Hasło</label>
                            <input
                                type="password"
                                id="password"
                                required
                                placeholder="Hasło"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </div>

                        {/* Przycisk logowania */}
                        <button type="submit" onClick={login}>Zaloguj się</button>
                    </form>



                    {/* Link do tworzenia konta */}
                    <div className="create-account">
                        <a onClick={handleRegisterClick}>Zarejestruj się</a>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;