
import React, { useState, useEffect } from 'react';
import './App.css';
import Works from './components/Works';
import Header from './components/Header';
import { Alert } from "react-bootstrap";

function App() {

  const [message, setMessage] = useState(false);

  const setMessageHandler = (status) => {
    if (status) {
      setMessage('successfully added')
    }
    console.log(status)
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }, [message]);

  return (
    <div className="container">
      <Header />
      {(message) ? <Alert variant="success">
        {message}</Alert> : ''}
      <Works status={setMessageHandler} />
    </div>
  );
}

export default App;
