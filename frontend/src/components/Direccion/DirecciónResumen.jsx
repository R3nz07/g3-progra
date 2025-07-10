import React from 'react';
import styles from '../../styles/Carrito.module.css';

const DireccionResumen = ({ direccion }) => {
  if (!direccion) return <p>No hay dirección registrada.</p>;

  return (
    <div className={styles.direccionResumenContainer}>
      <h2 className={styles.direccionResumenTitle}>Dirección de Envío</h2>
      <div className={styles.direccionResumenContent}>
        <p className={styles.direccionResumenItem}>
          <strong>Nombre:</strong> {direccion.nombre} {direccion.apellido}
        </p>
        <p className={styles.direccionResumenItem}>
          <strong>Departamento:</strong> {direccion.departamento}
        </p>
        <p className={styles.direccionResumenItem}>
          <strong>Ciudad:</strong> {direccion.ciudad}
        </p>
        <p className={styles.direccionResumenItem}>
          <strong>Dirección:</strong> {direccion.direccion}
        </p>
        <p className={styles.direccionResumenItem}>
          <strong>Código Postal:</strong> {direccion.codigoPostal}
        </p>
        <p className={styles.direccionResumenItem}>
          <strong>Teléfono:</strong> {direccion.telefono}
        </p>
      </div>
    </div>
  );
};

export default DireccionResumen;