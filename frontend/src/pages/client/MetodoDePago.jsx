import React, { useState, useContext, useEffect } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import SelectorMetodoPago from '../../components/Pago/SelectorMetodoPago';
import ModalTarjeta from '../../components/Pago/ModalTarjeta';
import ModalQR from '../../components/Pago/ModalQR';
import DireccionResumen from '../../components/Direccion/DirecciónResumen'; 
import CarritoResumen from '../../components/Carrito/CarritoResumen';
import Footer from '../../components/Footer/Footer';
import { CartContext } from '../../hooks/CartContext';
import { useLogin } from '../../hooks/LoginContext';
import { getDireccionUsuario } from '../../services/usarioServices';
import styles from '../../styles/Carrito.module.css';

export const MetodoDePago = () => {
  const [busqueda, setBusqueda] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [showModalQR, setShowModalQR] = useState(false);
  const [showModalTarjeta, setShowModalTarjeta] = useState(false);
  const [direccion, setDireccion] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Usar el hook personalizado para el carrito
  const { cart } = useContext(CartContext);
  const { currentUser } = useLogin();
  
  // Debug: verificar que el contexto esté funcionando
  console.log('MetodoDePago - cart:', cart);
  console.log('MetodoDePago - currentUser:', currentUser);
  
  // Verificar que cart sea un array válido
  const juegosSeguros = Array.isArray(cart) ? cart : [];

  useEffect(() => {
    if (currentUser?.id_usuario) {
      getDireccionUsuario(currentUser.id_usuario)
        .then(dir => {
          setDireccion(dir);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading address:', error);
          setDireccion(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

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
      <div className={styles.carritoWrapper}>
        <div className={styles.checkoutForm}>
          <h2>Selecciona tu método de pago</h2>
          <SelectorMetodoPago metodoPago={metodoPago} setMetodoPago={setMetodoPago} />
          <button 
            onClick={handleContinuar} 
            className={styles.continuarButton}
          >
            Continuar
          </button>
        </div>
        <div className={styles.checkoutResumen}>
          {/* Resumen de compra */}
          <CarritoResumen juegos={juegosSeguros} />
          <br/>
          {/* Dirección */}
          {loading ? (
            <p>Cargando dirección...</p>
          ) : direccion ? (
            <DireccionResumen direccion={direccion} />
          ) : (
            <p>No hay dirección registrada</p>
          )}
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
      <Footer />
    </>
  );
};

export default MetodoDePago;
