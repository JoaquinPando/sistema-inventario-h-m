import React from 'react';
//Importamos el componente Link
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div>
      <h1>Hola soy un Dashboard</h1>
      {/*Añadimos un enlace para ir a la gestión de usuarios*/}
      <nav>
        <Link to="/usuarios">Ir a Gestión de Usuarios</Link>
      </nav>
    </div>
  );
}

export default Dashboard;