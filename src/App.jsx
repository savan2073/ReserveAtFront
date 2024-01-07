import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Biz from './components/Business';
import BizRegister from './components/BizRegister';
import UserProfile from "./components/UserProfile.jsx";
import BizLogin from "./components/BizLogin.jsx";
import BusinessDashboard from "./components/BusinessDashboard.jsx";
import AddEmployeeForm from "./components/AddEmployeeForm.jsx";
import AddActivity from "./components/AddActivity.jsx";
import SearchPage from "./components/SearchPage.jsx";
import BusinessPage from "./components/BusinessPage.jsx";
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/biz" element={<Biz />}/>
          <Route path="/biz/register" element={<BizRegister/>}/>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/biz/login" element={<BizLogin/>}/>
          <Route path="/business-dashboard" element={<BusinessDashboard/>}/>
          <Route path="/add-employee" element={<AddEmployeeForm/>}/>
          <Route path="/add-activity/:employeeId" element={<AddActivity/>} />
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/business/:city/:businessName" element={<BusinessPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
