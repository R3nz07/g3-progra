import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CarritoItems from '../../components/Carrito/CarritoItems';
import CarritoResumen from '../../components/Carrito/CarritoResumen';
import styles from '../../styles/Carrito.module.css';

import { carritoInicial } from '../../constantes/consts';

export const Carrito = () => {
  const [juegosEnCarrito, setJuegosEnCarrito] = useState(carritoInicial);

  return (
    <div className={styles.carritoWrapper}>
      <div className={styles.carritoContenido}>
        <h1>Carrito</h1>
        <CarritoItems juegos={juegosEnCarrito} />
        <Link to="/inicio" className={styles.botonSeguirComprando}>
          Seguir comprando
        </Link>
      </div>
      <CarritoResumen juegos={juegosEnCarrito} />
    </div>
  );
};

export default Carrito;
