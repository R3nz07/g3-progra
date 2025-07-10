// UsuariosTabla.jsx
import React, { useState, useEffect } from 'react';
import Tabla from '../Tabla/Tabla';
import { usuarios as usuariosConst } from '../../../constantes/Consts';
import styles from './UsuariosTabla.module.css';

const UsuariosTabla = ({ usuarios = [], onVerDetalle }) => {
  // Filtrar admin y solo usuarios con id_usuario definido
  const usuariosMostrados = usuarios.filter(
    u => u.correo !== 'admin@tienda.com' && u.id_usuario !== undefined && u.id_usuario !== null
  );

  return (
    <div className={styles.tableWrapper} style={{ maxHeight: 320, overflowY: 'auto', overflowX: 'hidden', direction: 'ltr', scrollbarWidth: 'thin', background: '#f8fafc', border: '1.5px solid #e0e7ef', borderRadius: 12, boxShadow: '0 2px 12px #e0e7ef55' }}>
      <Tabla
        title={<span style={{fontWeight:'bold',fontSize:'1.3rem',color:'#222'}}>Usuarios registrados</span>}
        tableClassName={styles.usuarioTable}
        columns={['Nombre', 'Estado', 'Acciones']}
        data={usuariosMostrados}
        renderRow={u => (
          <tr key={u.id_usuario} style={{background:'#fff',borderRadius:8}}>
            <td style={{fontWeight:'500',color:'#222'}}>{u.nombre}</td>
            <td className={u.estado === 'Activo' ? styles.activo : styles.inactivo} style={{fontWeight:'bold'}}>
              {u.estado}
            </td>
            <td>
              <button
                className={styles.verDetalle}
                style={{marginBottom:4}}
                onClick={() => onVerDetalle(u.id_usuario)}
              >
                Ver detalle
              </button>
              {/* Botón de deshabilitar solo visual, no funcional */}
              <button
                className={u.estado === 'Activo' ? styles.deshabilitar : styles.activar}
                style={{opacity:0.5, pointerEvents:'none'}}
                disabled
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
