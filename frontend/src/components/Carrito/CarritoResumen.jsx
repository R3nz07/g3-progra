import React from 'react';
import styles from '../../styles/Carrito.module.css';

function CarritoResumen({ juegos = [], botonTexto = "Continuar compra", botonRuta = "/checkout" }) {
  // Verificar que juegos sea un array válido
  const juegosSeguros = Array.isArray(juegos) ? juegos : [];
  
  const total = juegosSeguros.reduce((acc, j) => acc + (j.precio || 0) * (j.quantity || 1), 0);
  const descuento = 0;
  const totalFinal = total - descuento;

  return (
    <div className={styles.resumenBox}>
      <h2>Resumen de compra</h2>
      <div className={styles.resumenFila}>
        <span>Juegos ({juegosSeguros.length})</span>
        <span>S/. {total.toFixed(2)}</span>
      </div>
      <div className={styles.resumenFila}>
        <span>Descuentos</span>
        <span>-S/. {descuento.toFixed(2)}</span>
      </div>
      <div className={styles.totalFila}>
        <span>Total</span>
        <span>S/. {totalFinal.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CarritoResumen;