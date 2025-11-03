import logo from './logo.svg';
import React from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { useEffect } from 'react'; //Importamos useEffect para la persistencia
//Importamos las herramientas para las rutas
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  //Inicializamos useNavigate
  const navigate = useNavigate();
  //useEffect se ejecuta una vez cuando App se carga
  useEffect(() => {
    //Revisamos la "caja fuerte" (localStorage)
    const token = localStorage.getItem('token');
    //IF/ELSE
    if (token) {
      //Si hay un token, asumimos que está logueado
      //y lo mandamos al dashboard
      navigate('/dashboard');
    } else {
      //Si NO hay token, lo forzamos a ir a /login
      navigate('/login');
    }
    // El '[]' al final significa: "ejecuta esto solo una vez"
  }, []);

  return (
    <div className="App">
      {/*'Routes' envuelve todas nuestras rutas individuales */}
      <Routes>
        {/*Definimos nuestra primera ruta */}
        <Route path="/login" element={<Login />} />
        {/*Definimos la dashboard ruta */}
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
