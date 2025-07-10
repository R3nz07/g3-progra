import React from 'react';
import styles from './UsuarioDetalleCard.module.css';
import Tabla from '../Tabla/Tabla';

const UsuarioDetalleCard = ({ usuario }) => {
  if (!usuario) {
    return <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>No hay datos del usuario seleccionados.</div>;
  }
  return (
    <section className={styles.cardSection}>
      <h2 className={styles.title}>Detalle del usuario</h2>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src={usuario.foto} alt={usuario.nombre} className={styles.foto} />
          <div>
            <h3>{usuario.nombre}</h3>
            <p>
              <strong>Correo:</strong>{' '}
              <a href={`mailto:${usuario.correo}`}>{usuario.correo}</a>
            </p>
            <p><strong>Fecha de registro:</strong> {usuario.fechaRegistro}</p>
            <p><strong>Estado:</strong> {usuario.estado}</p>
          </div>
        </div>

        <Tabla
          title="Órdenes"
          columns={['#ID', 'Fecha', 'Total']}
          data={usuario.ordenes}
          renderRow={o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.fecha}</td>
              <td>S/{o.total.toFixed(2)}</td>
            </tr>
          )}
        />
      </div>
    </section>
  );
};

export default UsuarioDetalleCard;
