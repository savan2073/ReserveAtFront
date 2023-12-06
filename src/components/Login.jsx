import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.css';
import guywithlaptop from '../assets/images/guywithlaptop.jpg';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/api/users/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
             console.log(res.data);
             
             if (res.data.message == "Email does not exit") 
             {
               alert("Email not exits");
             } 
             else if(res.data.message == "Login success")
             { 
                
                navigate('/home');
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
                    <h2>Sign in</h2>
                    <form>
                        {/* Pole wejściowe dla nazwy użytkownika/emaila */}
                        <div className="input-field">
                            <label htmlFor="email">Your Name</label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="Enter Email"
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
                        <button type="submit" onClick={login}>Log in</button>
                    </form>

                    {/* Przyciski logowania społecznościowego */}
                    <div className="social-login">
                        <p>Or login with</p>
                        <button className="facebook">Facebook</button>
                        <button className="twitter">Twitter</button>
                        <button className="google">Google</button>
                    </div>

                    {/* Link do tworzenia konta */}
                    <div className="create-account">
                        <a onClick={handleRegisterClick}>Create an account</a>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;