// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from 'react-router-dom';

function Biz() {

    const navigate = useNavigate();

    const handleCreateBizClick = () => {
        navigate('/biz/register');
    }

    return(
        <header>
            <img src="logo" alt="RAtLogo" />
            <br/>
            <button onClick={handleCreateBizClick}>ZAREJESTRUJ SWÓJ BIZNES</button>
        </header>
    );

}


export default Biz;