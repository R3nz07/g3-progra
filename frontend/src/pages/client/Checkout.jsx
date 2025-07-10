import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarritoItems from '../../components/Carrito/CarritoItems';
import CarritoResumen from '../../components/Carrito/CarritoResumen';
import DireccionResumen from '../../components/Direccion/DirecciónResumen';
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer';
import styles from '../../styles/Carrito.module.css';
import { CartContext } from '../../hooks/CartContext';
import { getDireccionUsuario, updateDireccionUsuario } from '../../services/usarioServices';
import { useLogin } from '../../hooks/LoginContext';

// Formulario simple para agregar/editar dirección
const FormularioDireccion = ({ direccion = {}, onSave, currentUser }) => {
  const [form, setForm] = useState({
    nombre: direccion.nombre || currentUser?.nombre || '',
    apellido: direccion.apellido || currentUser?.apellido || '',
    departamento: direccion.departamento || '',
    ciudad: direccion.ciudad || '',
    direccion: direccion.direccion || '',
    codigoPostal: direccion.codigoPostal || '',
    telefono: direccion.telefono || ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className={styles.direccionFormContainer}>
      <h2 className={styles.direccionFormTitle}>
        {direccion.nombre ? 'Editar Dirección de Envío' : 'Agregar Dirección de Envío'}
      </h2>
      <form onSubmit={handleSubmit} className={styles.direccionForm}>
        <div className={styles.direccionFormRow}>
          <input 
            name="nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            placeholder="Nombre" 
            required 
            className={styles.direccionFormInput}
          />
          <input 
            name="apellido" 
            value={form.apellido} 
            onChange={handleChange} 
            placeholder="Apellido" 
            required 
            className={styles.direccionFormInput}
          />
        </div>
        <div className={styles.direccionFormRow}>
          <input 
            name="departamento" 
            value={form.departamento} 
            onChange={handleChange} 
            placeholder="Departamento" 
            required 
            className={styles.direccionFormInput}
          />
          <input 
            name="ciudad" 
            value={form.ciudad} 
            onChange={handleChange} 
            placeholder="Ciudad" 
            required 
            className={styles.direccionFormInput}
          />
        </div>
        <input 
          name="direccion" 
          value={form.direccion} 
          onChange={handleChange} 
          placeholder="Dirección completa" 
          required 
          className={styles.direccionFormInputFull}
        />
        <div className={styles.direccionFormRow}>
          <input 
            name="codigoPostal" 
            value={form.codigoPostal} 
            onChange={handleChange} 
            placeholder="Código Postal" 
            required 
            className={styles.direccionFormInput}
          />
          <input 
            name="telefono" 
            value={form.telefono} 
            onChange={handleChange} 
            placeholder="Teléfono" 
            required 
            className={styles.direccionFormInput}
          />
        </div>
        <button 
          type="submit" 
          className={styles.direccionFormButton}
        >
          {direccion.nombre ? 'Actualizar Dirección' : 'Guardar Dirección'}
        </button>
      </form>
    </div>
  );
};

export const Checkout = () => {
  const { cart } = React.useContext(CartContext);
  const { currentUser } = useLogin();
  const [direccion, setDireccion] = useState(null);
  const [editando, setEditando] = useState(true); // Always start in editing mode
  const [mostrarBotonMetodoPago, setMostrarBotonMetodoPago] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.id_usuario) {
      getDireccionUsuario(currentUser.id_usuario)
        .then(dir => {
          setDireccion(dir);
          // If user has an address, they can proceed to payment
          setMostrarBotonMetodoPago(!!dir);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading address:', error);
          setDireccion(null);
          setMostrarBotonMetodoPago(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleGuardarDireccion = async (nuevaDireccion) => {
    if (!currentUser?.id_usuario) return;
    try {
      const updatedUser = await updateDireccionUsuario(currentUser.id_usuario, nuevaDireccion);
      
      // Extract address fields from the updated user
      const direccionActualizada = {
        nombre: updatedUser.nombre,
        apellido: updatedUser.apellido,
        departamento: updatedUser.departamento,
        ciudad: updatedUser.ciudad,
        direccion: updatedUser.direccion,
        codigoPostal: updatedUser.codigoPostal,
        telefono: updatedUser.telefono
      };
      
      setDireccion(direccionActualizada);
      setMostrarBotonMetodoPago(true);
      setEditando(false); // Hide form after saving
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Error al guardar la dirección. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', busqueda);
  };

  const handleSelectedItemsChange = (ids) => {
    setSelectedIds(ids);
  };

  const juegosSeleccionados = cart.filter(j => selectedIds.includes(j.id));

  return (
    <>
      <TopBar handleSearch={handleSearch} busqueda={busqueda} setBusqueda={setBusqueda} />
      <div className={styles.carritoWrapper}>
        <div className={styles.checkoutForm}>
          {/* Always show address form or summary */}
          {loading ? (
            <p>Cargando dirección...</p>
          ) : direccion && !editando ? (
            <>
              <DireccionResumen direccion={direccion} />
              <button 
                onClick={() => setEditando(true)}
                className={styles.editarDireccionButton}
              >
                Editar dirección
              </button>
            </>
          ) : (
            <FormularioDireccion direccion={direccion} onSave={handleGuardarDireccion} currentUser={currentUser} />
          )}
        </div>
        <div className={styles.checkoutResumen}>
          <CarritoResumen juegos={juegosSeleccionados} />
          <br/>
          {/* Only show the button if user has saved an address */}
          {mostrarBotonMetodoPago && (
            <Link to="/MetodoDePago" className={styles.botonSeguirComprando}>
              Agregar Metodo De Pago
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;