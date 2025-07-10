import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../hooks/CartContext';
import CarritoItems from '../../components/Carrito/CarritoItems';
import CarritoResumen from '../../components/Carrito/CarritoResumen';
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer';
import styles from '../../styles/Carrito.module.css';

export const Carrito = () => {
  const { cart, selectedIds, updateSelectedIds } = useContext(CartContext);
  const [busqueda, setBusqueda] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', busqueda);
  };

  // Los productos seleccionados se filtran desde el contexto
  const selectedItems = cart.filter((item) => selectedIds.includes(item.id));

  return (
    <>
      <TopBar handleSearch={handleSearch} busqueda={busqueda} setBusqueda={setBusqueda} />
      <div className={styles.carritoWrapper}>
        <div className={styles.carritoContenido}>
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <>
              <h1>Carrito</h1>
              <CarritoItems
                juegos={cart}
                onSelectedItemsChange={updateSelectedIds} // Usa el contexto
              />
              <Link to="/" className={styles.botonSeguirComprando}>
                Seguir explorando
              </Link>
            </>
          )}
        </div>
        <div>
          <CarritoResumen juegos={selectedItems} />
          {selectedItems.length === 0 ? (
            <p className={styles.mensajeNoSeleccionados}>
              No hay ningún producto seleccionado para la compra.
            </p>
          ) : (
            <Link to="/checkout" className={styles.botonSeguirComprando}>
              Continuar
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Carrito;
