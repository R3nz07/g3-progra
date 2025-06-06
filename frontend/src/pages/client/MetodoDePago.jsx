import React, { useState, useContext } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import SelectorMetodoPago from '../../components/Pago/SelectorMetodoPago';
import ModalTarjeta from '../../components/Pago/ModalTarjeta';
import ModalQR from '../../components/Pago/ModalQR';
import DireccionResumen from '../../components/Direccion/DirecciónResumen'; 
import CarritoResumen from '../../components/Carrito/CarritoResumen';
import Footer from '../../components/Footer/Footer'; // Importa el footer
import { CartContext } from '../../hooks/CartContext'; // Importa el contexto del carrito
import styles from '../../styles/Carrito.module.css';

export const MetodoDePago = () => {
  const [busqueda, setBusqueda] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [showModalQR, setShowModalQR] = useState(false);
  const [showModalTarjeta, setShowModalTarjeta] = useState(false);
  const { cart } = useContext(CartContext); // Obtiene los juegos en el carrito desde el contexto

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', busqueda);
  };

  const handleContinuar = () => {
    if (metodoPago === 'qr') {
      setShowModalQR(true);
    } else if (metodoPago === 'tarjeta') {
      setShowModalTarjeta(true);
    }
  };

  return (
    <>
      <TopBar handleSearch={handleSearch} busqueda={busqueda} setBusqueda={setBusqueda} />
      <div className={styles.carritoWrapper} style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <div style={{ flex: 2 }}>
          <h2>Selecciona tu método de pago</h2>
          <SelectorMetodoPago metodoPago={metodoPago} setMetodoPago={setMetodoPago} />
          <button onClick={handleContinuar} style={{ marginTop: '1rem' }}>
            Continuar
          </button>
        </div>
        <div style={{ flex: 1 }}>
          {/* Resumen de compra */}
          <CarritoResumen juegos={cart} />
          <br/>
          {/* Dirección */}
          <DireccionResumen />
        </div>
      </div>
      <ModalQR
        visible={showModalQR}
        onClose={() => setShowModalQR(false)}
      />
      <ModalTarjeta
        visible={showModalTarjeta}
        onClose={() => setShowModalTarjeta(false)}
        onCreate={(valor) => {
          setShowModalTarjeta(false);
        }}
      />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default MetodoDePago;
