import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Registration from './registration.jsx'
// import {BrowserRouter} from 'react-router-dom'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Admin from './pages/admin.jsx'
import Login from './pages/Login.jsx'
import Login_user from './pages/Login_user.jsx'
import Login_admin from './pages/Login_admin.jsx'
import NewUser from './pages/New_userlogin.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/login/admin" element={<Login_admin />} />
        <Route path="/login/user" element={<Login_user />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
