import React from 'react';
import UsuarioDetalleCard from './UsuarioDetalleCard';

const UsuariosDetalle = ({ usuario }) => (
  <section>
    {usuario
      ? <UsuarioDetalleCard usuario={usuario} />
      : <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>Selecciona un usuario para ver el detalle</div>
    }
  </section>
)

export default UsuariosDetalle
