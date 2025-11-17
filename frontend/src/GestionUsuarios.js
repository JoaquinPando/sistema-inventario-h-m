import React from 'react';
import { useEffect, useState } from 'react';

function GestionUsuarios() {
    //inicializando variables
    const [usuariosLista, setusuariosLista] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);
    const [error, setError] = useState(null);
    const [idParaEditar, setIdParaEditar] = useState(null);
    const ACCESS_TOKEN = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:8000/api/users/',
            {
                headers: {
                    'Authorization': `Token ${ACCESS_TOKEN}`,
                },
            })

            .then(Response => Response.json())
            .then(data => {
                // Hacemos ambas cosas aquí adentro
                console.log('mi token es: ', ACCESS_TOKEN)
                console.log('Datos recibidos del API:', data);
                setusuariosLista(data); //Guardamos la lista en el estado
            })


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Enviando datos:', username, password);
        // 1. Usamos fetch() para enviar los datos
        //inizializamos variables
        let userMetodo = ""
        let urlAction = ''
        if (updateUser) {
            userMetodo = "PUT"
            urlAction = `http://localhost:8000/api/users/${idParaEditar}/`
        } else {
            userMetodo = "POST"
            urlAction = 'http://localhost:8000/api/users/'
        }
        fetch(urlAction, {

            method: userMetodo, // Le decimos que es un POST
            headers: {
                'Content-Type': 'application/json', // Le decimos que enviamos JSON
                'Authorization': `token ${ACCESS_TOKEN}`,
            },
            // 2. Convertimos nuestros datos de React a un string JSON
            body: JSON.stringify({
                username: username,
                email: email,
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
                if (data) {
                    closeModal()
                    if (!updateUser) {
                        setusuariosLista([
                            ...usuariosLista,
                            data
                        ])
                    } else {
                        //LÓGICA DE ACTUALIZAR
                        setusuariosLista(
                            usuariosLista.map(usuario =>
                                // Esta es la lógica clave:
                                // Si el ID del usuario coincide con el que editamos...
                                usuario.id === idParaEditar
                                    ? data  // ...pon el 'data' (el usuario actualizado)
                                    : usuario // ...si no, pon el usuario antiguo
                            )
                        );
                    }
                    limpiarCampos()

                }
            })
            .catch(err => {
                // 5. Esto captura errores de red (ej. si el servidor backend está apagado)
                console.error('Error de red:', err);
                setError('No se pudo conectar al servidor.');
            });
    };


    const listUsers = usuariosLista.map(item =>
        <div>
            <ul>
                <li>{item.id}</li>
                <li>{item.username}</li>
                <li>{item.email}</li>
            </ul>
        </div>)



    function openModal() {
        setIsModalOpen(true)
        console.log(isModalOpen)
    }
    function closeModal() {
        setIsModalOpen(false)
        console.log(isModalOpen)
    }
    function deleteUser(idParaBorrar) {
        fetch(`http://localhost:8000/api/users/${idParaBorrar}/`, {
            method: 'DELETE', // Le decimos que es un DELETE
            headers: {
                'Content-Type': 'application/json', // Le decimos que enviamos JSON
                'Authorization': `Token ${ACCESS_TOKEN}`,
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log("usuario eliminado satisfactoriamente")
                    setusuariosLista(
                        // Filtramos la lista, quedándonos solo con los usuarios
                        // cuyo ID NO sea el que acabamos de borrar.
                        usuariosLista.filter(usuario => usuario.id !== idParaBorrar)
                    );

                }
            })
            .catch(err => {
                console.error('Error de red:', err);
                setError('No se pudo conectar al servidor.');
            });
    }
    function updateUserfunction(id) {
        // a. Encontrar el usuario en la lista
        const usuarioAEditar = usuariosLista.find(u => u.id === id);
        if (!usuarioAEditar) return; // Salir si no se encuentra

        // b. Pre-llenar el formulario con los datos de ese usuario
        setUsername(usuarioAEditar.username);
        setEmail(usuarioAEditar.email);
        setPassword(''); // Dejamos el password vacío por seguridad

        // c. Guardar el ID y abrir el modal
        setIdParaEditar(id); // ¡Guardamos el ID en el estado!
        setUpdateUser(true);
        setIsModalOpen(true);
    }
    function limpiarCampos() {
        setUsername('')
        setEmail('')
        setPassword('')
    }
    function nuevoUsuario() {
        openModal()
        limpiarCampos()
    }


    return (
        <div>
            <h1>Lista de Usuarios</h1>

            {/*Aquí ponemos el nuevo botón */}
            <button onClick={nuevoUsuario}>Crear Nuevo Usuario</button>

            {/*Y aquí dejamos la lista que ya teníamos */}
            <ul>
                {usuariosLista.map(usuario => (
                    <li key={usuario.id}>
                        <strong>{usuario.username}</strong> - ({usuario.email}) <button onClick={() => updateUserfunction(usuario.id)}>Editar</button>  <button onClick={() => deleteUser(usuario.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {isModalOpen &&
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <form onSubmit={handleSubmit}>
                            <h1>Register user</h1>
                            <label htmlFor="user"><b>User</b></label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>


                            <label htmlFor="Email"><b>Email</b></label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>


                            <label htmlFor="password"><b>password</b></label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

                            <button type="submit">Crear</button>
                        </form>
                    </div>
                </div>
            }
        </div>


    );

}


export default GestionUsuarios;