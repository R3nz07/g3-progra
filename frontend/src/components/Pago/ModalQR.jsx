import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { CartContext } from '../../hooks/CartContext';
import { DireccionContext } from '../../hooks/DireccionContext';
import { useLogin } from '../../hooks/LoginContext';
import { crearOrden } from '../../services/tiendaService';
import styles from './ModalPagos.module.css';
import yapeLogo from './yape-logo.png';
import yapeQR from './yape-qr.jpg';

const ModalQR = ({ visible, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { cart, selectedIds, clearCart } = useContext(CartContext);
  const { direccionEnvio } = useContext(DireccionContext);
  const { currentUser } = useLogin();

  if (!visible) return null;

  // Procesar la orden real
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      // Validar que el usuario esté logueado
      if (!currentUser || !currentUser.id_usuario) {
        throw new Error('Debes iniciar sesión para realizar una compra');
      }

      // Validar que haya dirección de envío
      if (!direccionEnvio) {
        throw new Error('Debes completar la dirección de envío');
      }

      // Obtener productos seleccionados
      const productosSeleccionados = cart.filter(producto => selectedIds.includes(producto.id));
      
      if (productosSeleccionados.length === 0) {
        throw new Error('No hay productos seleccionados');
      }

      // Calcular total
      const total = productosSeleccionados.reduce(
        (sum, producto) => sum + (producto.precio * producto.quantity), 0
      );

      // Preparar datos de la orden
      const ordenData = {
        id_usuario: currentUser.id_usuario,
        productos: productosSeleccionados.map(producto => ({
          id_producto: producto.id,
          cantidad: producto.quantity,
          precio: producto.precio
        })),
        direccion: direccionEnvio,
        metodo_pago: 2, // ID del método de pago por QR (Yape)
        total: total
      };

      // Enviar orden al backend
      const resultado = await crearOrden(ordenData);
      
      // Limpiar carrito después de orden exitosa
      clearCart();
      
      // Redirigir a orden completada
      navigate('/ordencompletada');
      
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      setError(error.message || 'Error al procesar la orden');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Escanea el QR para pagar</h3>
        <img src={yapeLogo} className={styles.yapeLogo} />
        <div className={styles.qrPlaceholder}>
          <img src={yapeQR} className={styles.yapeQR} />
        </div>
        {error && (
          <div className={styles.errorMessage} style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
        <button 
          type="button" 
          onClick={handleSubmit} 
          className={styles.botonContinuar}
          disabled={isProcessing}
        >
          {isProcessing ? 'Procesando...' : 'Continuar'}
        </button>
        <button 
          type="button" 
          onClick={onClose} 
          className={styles.botonCerrar}
          disabled={isProcessing}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalQR;