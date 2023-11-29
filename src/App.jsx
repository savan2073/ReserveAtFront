import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
function App() {
  return (
    <div className='App'>
      
      <BrowserRouter>
            <Routes>
              <Route path="/register" element= { <Register/>} />
              <Route path="/login" element= { <Login/>} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
