// UsuariosTabla.jsx
import React, { useState, useEffect } from 'react';
import Tabla from '../Tabla/Tabla';
import { usuarios as usuariosConst } from '../../../constantes/Consts';
import styles from './UsuariosTabla.module.css';

const UsuariosTabla = ({ usuarios = [], onVerDetalle }) => {
  // Limitar a los primeros 5 usuarios
  const usuariosMostrados = usuarios.slice(0, 5);

  return (
    <div className={styles.tableWrapper} style={{ maxHeight: 320, overflowY: 'auto', overflowX: 'hidden', direction: 'ltr', scrollbarWidth: 'thin' }}>
      <Tabla
        title="Usuarios registrados"
        tableClassName={styles.usuarioTable}
        columns={['Nombre', 'Estado', 'Acciones']}
        data={usuariosMostrados}
        renderRow={u => (
          <tr key={u.id_usuario}>
            <td>{u.nombre}</td>
            <td className={u.estado === 'Activo' ? styles.activo : styles.inactivo}>
              {u.estado}
            </td>
            <td>
              <button
                className={styles.verDetalle}
                onClick={() => onVerDetalle(u.id_usuario)}
              >
                Ver detalle
              </button>
              <button
                className={u.estado === 'Activo' ? styles.deshabilitar : styles.activar}
                // Aquí podrías agregar lógica para activar/desactivar si lo deseas
              >
                {u.estado === 'Activo' ? 'Deshabilitar' : 'Activar'}
              </button>
            </td>
          </tr>
        )}
        actions={[
          { label: 'Ver todos los usuarios', to: '/listausuarios', variant: 'primary' }
        ]}
      />
    </div>
  );
};

export default UsuariosTabla;
