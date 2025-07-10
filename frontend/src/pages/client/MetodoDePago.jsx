import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import SelectorMetodoPago from '../../components/Pago/SelectorMetodoPago';
import ModalTarjeta from '../../components/Pago/ModalTarjeta';
import ModalQR from '../../components/Pago/ModalQR';
import DireccionResumen from '../../components/Direccion/DirecciónResumen'; 
import CarritoResumen from '../../components/Carrito/CarritoResumen';
import Footer from '../../components/Footer/Footer';
import { CartContext } from '../../hooks/CartContext';
import { DireccionContext } from '../../hooks/DireccionContext';
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
  const { setDireccionEnvio } = useContext(DireccionContext);
  const { currentUser } = useLogin();
  
  // Debug: verificar que el contexto esté funcionando
  console.log('MetodoDePago - cart:', cart);
  console.log('MetodoDePago - currentUser:', currentUser);
  console.log('MetodoDePago - loading:', loading);
  console.log('MetodoDePago - direccion:', direccion);
  
  // Verificar que cart sea un array válido
  const juegosSeguros = Array.isArray(cart) ? cart : [];
  console.log('MetodoDePago - juegosSeguros:', juegosSeguros);

  useEffect(() => {
    console.log('MetodoDePago - useEffect triggered, currentUser:', currentUser);
    if (currentUser?.id_usuario) {
      console.log('MetodoDePago - Getting address for user:', currentUser.id_usuario);
      getDireccionUsuario(currentUser.id_usuario)
        .then(dir => {
          console.log('MetodoDePago - Address loaded:', dir);
          setDireccion(dir);
          // Actualizar el contexto de dirección para que esté disponible en los modales
          setDireccionEnvio(dir);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading address:', error);
          setDireccion(null);
          setDireccionEnvio(null);
          setLoading(false);
        });
    } else {
      console.log('MetodoDePago - No currentUser, setting loading to false');
      setLoading(false);
    }
  }, [currentUser, setDireccionEnvio]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', busqueda);
  };

  const handleContinuar = () => {
    console.log('MetodoDePago - handleContinuar called with metodoPago:', metodoPago);
    
    // Verificar si se seleccionó un método de pago
    if (!metodoPago) {
      console.log('MetodoDePago - No payment method selected');
      alert('Por favor selecciona un método de pago');
      return;
    }
    
    // Si todo está bien, proceder con el método de pago
    if (metodoPago === 'qr') {
      console.log('MetodoDePago - Opening QR modal');
      setShowModalQR(true);
    } else if (metodoPago === 'tarjeta') {
      console.log('MetodoDePago - Opening tarjeta modal');
      setShowModalTarjeta(true);
    }
  };

  console.log('MetodoDePago - Rendering component');
  
  // Renderizado simplificado para pruebas
  return (
    <>
      <TopBar handleSearch={handleSearch} busqueda={busqueda} setBusqueda={setBusqueda} />
      <div className={styles.carritoWrapper}>
        <div className={styles.checkoutForm}>
          <h2>Selecciona tu método de pago</h2>
          <p>Usuario: {currentUser?.nombre || 'No logueado'}</p>
          <p>Productos en carrito: {juegosSeguros.length}</p>
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
            <p>Dirección de envío configurada</p>
          )}
        </div>
      </div>
      {showModalQR && (
        <ModalQR
          visible={showModalQR}
          onClose={() => setShowModalQR(false)}
        />
      )}
      {showModalTarjeta && (
        <ModalTarjeta
          visible={showModalTarjeta}
          onClose={() => setShowModalTarjeta(false)}
          onCreate={(valor) => {
            setShowModalTarjeta(false);
          }}
        />
      )}
      <Footer />
    </>
  );
};

export default MetodoDePago;
