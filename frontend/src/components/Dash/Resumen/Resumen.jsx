import React, { useEffect, useState } from 'react';
import styles from './Resumen.module.css';
import ResumenCaja from './ResumenCaja';
import { obtenerUsuarios } from '../../../services/listaUsuariosService';

const Resumen = () => {
  const [usuariosCount, setUsuariosCount] = useState(0);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuarios = await obtenerUsuarios();
        setUsuariosCount(usuarios.length);
      } catch (error) {
        setUsuariosCount(0);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <>
      <h1 className={styles.titulo}>Dashboard</h1>
      <div className={styles.cardsContainer}>
        <ResumenCaja titulo="Órdenes" valor={0} />
        <ResumenCaja titulo="Usuarios registrados" valor={usuariosCount} />
        <ResumenCaja titulo="Ingresos totales" valor="S/0.00" />
      </div>
    </>
  );
};

export default Resumen;
