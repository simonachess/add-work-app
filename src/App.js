
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Works from './components/Works'
import WorkById from './components/WorkById'
import Header from './components/Header'
import { Alert } from "react-bootstrap"
import Register from './components/Register'
import Login from './components/Login'
import Reset from './components/Reset'

function App() {

  const [message, setMessage] = useState(false);

  const setMessageHandler = (status) => {
    if (status) {
      setMessage('successfully added')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage('')
    }, 3000);
  }, [message])

  return (
    <div className="container">
      <Router>
        <Header />
        {(message) ? <Alert variant="success">
          {message}</Alert> : ''}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/works" element={<Works status={setMessageHandler} />} />
          <Route path="works/work/:id" element={<WorkById />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
