import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Biz from './components/Business';
import BizRegister from './components/BizRegister';
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
