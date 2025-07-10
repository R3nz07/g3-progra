import React from 'react';
import styles from './OrdenDetalleCard.module.css';

const OrdenDetalleCard = ({ orden }) => {
  const estadoEsEntregado = orden.estado.toLowerCase() === 'entregado';

  return (
    <div className={styles.card}>
      <h2>
        Orden <span className={styles.ordenId}>#{orden.id_orden}</span>
      </h2>
      <div className={styles.estadoTotalContainer}>
        <p className={estadoEsEntregado ? styles.estadoEntregado : styles.estado}>
          Estado: <strong>{orden.estado}</strong>
        </p>
        <p className={styles.montoTotal}>
          Monto total: <strong>S/ {orden.total.toFixed(2)}</strong>
        </p>
      </div>

      <h3>Productos ordenados</h3>
      <table className={styles.ordenProductosTable}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orden.productos.map(prod => (
            <tr key={prod.id}>
              <td className={styles.idColor}>#{prod.id}</td>
              <td>{prod.nombre}</td>
              <td className={styles.categoriaBold}>{prod.categoria}</td>
              <td>{prod.cantidad}</td>
              <td>S/ {(prod.cantidad * prod.precio).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdenDetalleCard;
