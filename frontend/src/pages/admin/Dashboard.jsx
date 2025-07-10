import React, { useState, useEffect } from 'react';
import TopBarAdmin from '../../components/TopBar/TopBarAdmin';
import styles from '../../styles/Dashboard.module.css';
import Footer from '../../components/Footer/Footer'; 
import Resumen from '../../components/Dash/Resumen/Resumen';
import UsuariosTabla from '../../components/Dash/Usuarios/UsuariosTabla';
import UsuariosDetalle from '../../components/Dash/Usuarios/UsuariosDetalle';
import OrdenesTabla from '../../components/Dash/Ordenes/OrdenesTabla';
import { obtenerUsuarios, obtenerUsuarioPorId } from '../../services/listaUsuariosService';

export const Dashboard = () => {
  const [busqueda, setBusqueda] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioDetalle, setUsuarioDetalle] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        setUsuarios([]);
      }
    };
    fetchUsuarios();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', busqueda);
  };

  const handleVerDetalle = async (id_usuario) => {
    try {
      const usuario = await obtenerUsuarioPorId(id_usuario);
      setUsuarioDetalle(usuario);
    } catch (error) {
      setUsuarioDetalle(null);
    }
  };

  return (
    <>
      <TopBarAdmin busqueda={busqueda} setBusqueda={setBusqueda} handleSearch={handleSearch}/>
      <main className={styles.dashboard}>
        <Resumen />
        <div className={styles.seccionDoble}>
          <UsuariosTabla usuarios={usuarios} onVerDetalle={handleVerDetalle} />
          <UsuariosDetalle usuario={usuarioDetalle} />
        </div>
        <OrdenesTabla />
      </main>
      <Footer />
    </>
  );
};
export default Dashboard;