// frontend/src/Login.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Creamos un estado para guardar mensajes de error
    const [error, setError] = useState(null);
    //creo mi variable navigate
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Limpiamos errores anteriores

        console.log('Enviando datos:', username, password);

        // 1. Usamos fetch() para enviar los datos
        fetch('http://localhost:8000/api/login/', {
            method: 'POST', // Le decimos que es un POST
            headers: {
                'Content-Type': 'application/json', // Le decimos que enviamos JSON
            },
            // 2. Convertimos nuestros datos de React a un string JSON
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(response => {
                // 3. Cuando el servidor responde, primero convertimos su respuesta (que es JSON)
                return response.json();
            })
            .then(data => {
                // 4. 'data' es la respuesta JSON real del servidor
                console.log('Respuesta del servidor:', data);

                if (data.token) {
                    //redirigiendo
                    navigate("/dashboard");
                    console.log('¡Login exitoso! Token:', data.token);
                    localStorage.setItem('token', data.token)

                    // ¡Éxito! Aquí guardaríamos el token para usarlo después
                } else {
                    // Si no hay token, probablemente hubo un error
                    setError('Usuario o contraseña incorrectos.');
                }
            })
            .catch(err => {
                // 5. Esto captura errores de red (ej. si el servidor backend está apagado)
                console.error('Error de red:', err);
                setError('No se pudo conectar al servidor.');
            });
    };

    return (
        <div className="login-layout-wrapper">
            <div className="login-form-container">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    {/* Mostramos el mensaje de error si existe */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Ingresar</button>
                </form>
            </div>
            <div className="login-image-container">
                {/* Este div será la imagen */}
            </div>
        </div>
    );
}

export default Login;