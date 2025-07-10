import React from 'react';
import styles from './UsuarioDetalleCard.module.css';

const UsuarioDetalleCard = ({ usuario }) => {
  if (!usuario) {
    return <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>No hay datos del usuario seleccionados.</div>;
  }
  return (
    <section className={styles.cardSection}>
      <h2 className={styles.title}>Detalle del usuario</h2>
      <div className={styles.card}>
        <div className={styles.header}>
          {/* Si tienes foto, muéstrala, si no, muestra un icono genérico */}
          {usuario.foto ? (
            <img src={usuario.foto} alt={usuario.nombre} className={styles.foto} />
          ) : (
            <div className={styles.foto} style={{background:'#e0e7ef',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32}}>
              <span role="img" aria-label="user">👤</span>
            </div>
          )}
          <div>
            <h3>{usuario.nombre}</h3>
            <p>
              <strong>Correo:</strong>{' '}
              <a href={`mailto:${usuario.correo}`}>{usuario.correo}</a>
            </p>
            <p><strong>Fecha de registro:</strong> {usuario.fechaRegistro || usuario.fecha_registro || '-'}</p>
            <p><strong>Estado:</strong> {usuario.estado}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsuarioDetalleCard;
