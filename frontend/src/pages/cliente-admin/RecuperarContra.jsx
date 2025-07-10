// RecuperarContra.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/Text/TextInput';
import styles from '../../styles/RecuperarContra.module.css';
import Footer from '../../components/Footer/Footer';
import { recuperarContrasena } from '../../services/usarioServices';

function RecuperarContra() {
  const [email, setEmail] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('emailRecuperacion');
  }, []);

  const handleRecuperar = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await recuperarContrasena({ correo: email, clinica: respuesta, nuevaContrasena });
      alert('✅ Contraseña actualizada correctamente. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      alert('❌ ' + (error.message || 'Error al recuperar contraseña'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.recuperarContainer}>
      <div className={styles.recuperarContent}>
        <form onSubmit={handleRecuperar} className={styles.recuperarForm}>
          <h2>Recuperar Contraseña</h2>

          <TextInput
            type="email"
            placeholder="Correo registrado"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextInput
            placeholder="¿En qué clínica naciste?"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            required
          />

          <TextInput
            type="password"
            placeholder="Nueva contraseña"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            required
          />

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Procesando...' : 'Recuperar contraseña'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default RecuperarContra;