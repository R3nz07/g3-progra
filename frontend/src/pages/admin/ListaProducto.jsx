import React, { useState, useEffect } from 'react';
import TopBarAdmin from '../../components/TopBar/TopBarAdmin';
import BuscadorConBotones from '../../components/Lista/BuscadorConBotones';
import {
  fetchProductos,
  updateProducto,
  deleteProducto
} from '../../services/ProductoService';
import { fetchCategorias } from '../../services/ProductoService';
import styles from '../../components/Table/ListaUsuario.module.css';

export const ListaProducto = () => {
  const [busquedaTopbar, setBusquedaTopbar] = useState('');
  const [busquedaTabla, setBusquedaTabla] = useState('');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(null);
  const [productoEditado, setProductoEditado] = useState({});

  // Cargar productos y categorías
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProductos();
        setProductos(data);
        const cats = await fetchCategorias();
        setCategorias(cats);
      } catch (err) {
        console.error('Error al cargar productos o categorías:', err);
      }
    })();
  }, []);

  const handleSearchTopbar = (e) => {
    e.preventDefault();
  };

  const handleSearchTabla = (e) => {
    e.preventDefault();
  };

  // Eliminar producto
  const eliminar = async (id) => {
    if (id === undefined || id === null) {
      alert('ID de producto inválido. No se puede eliminar.');
      return;
    }
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await deleteProducto(id);
      setProductos(prev => prev.filter(prod => prod.id_producto !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Iniciar edición
  const iniciarEdicion = (prod) => {
    setModoEdicion(prod.id_producto);
    setProductoEditado({ ...prod });
  };

  // Guardar edición
  const guardarEdicion = async (id) => {
    try {
      await updateProducto(id, productoEditado);
      // Recargar productos desde el backend para mantener sincronizado el estado
      const data = await fetchProductos();
      data.sort((a, b) => a.id_producto - b.id_producto); // Ordenar por id ascendente
      setProductos(data);
      setModoEdicion(null);
      setProductoEditado({});
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const productosFiltrados = productos.filter(prod =>
    (prod.nombre || '').toLowerCase().includes(busquedaTabla.toLowerCase())
  );

  const getCategoriaNombre = (id_categoria) => {
    const cat = categorias.find(c => c.id_categoria === id_categoria);
    return cat ? cat.nombre : '';
  };

  return (
    <>
      <TopBarAdmin
        handleSearch={handleSearchTopbar}
        busqueda={busquedaTopbar}
        setBusqueda={setBusquedaTopbar}
      />

      <h1>Lista de Productos</h1>

      <div style={{ marginBottom: '16px' }}>
        <BuscadorConBotones
          busqueda={busquedaTabla}
          setBusqueda={setBusquedaTabla}
          handleSearch={handleSearchTabla}
        />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.usuarioTable}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Presentación</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>
                  No hay productos para mostrar.
                </td>
              </tr>
            ) : (
              productosFiltrados
                .filter(prod => prod.id_producto !== undefined && prod.id_producto !== null)
                .map(prod => (
                <tr key={prod.id_producto}>
                  <td>#{String(prod.id_producto).padStart(4, '0')}</td>
                  <td>
                    {modoEdicion === prod.id_producto ? (
                      <input
                        value={productoEditado.nombre || ''}
                        onChange={e => setProductoEditado({ ...productoEditado, nombre: e.target.value })}
                        style={{ width: '100%', padding: '4px' }}
                      />
                    ) : (
                      prod.nombre
                    )}
                  </td>
                  <td>
                    {modoEdicion === prod.id_producto ? (
                      <input
                        value={productoEditado.presentacion || ''}
                        onChange={e => setProductoEditado({ ...productoEditado, presentacion: e.target.value })}
                        style={{ width: '100%', padding: '4px' }}
                      />
                    ) : (
                      prod.presentacion
                    )}
                  </td>
                  <td>
                    {modoEdicion === prod.id_producto ? (
                      <input
                        value={productoEditado.descripcion || ''}
                        onChange={e => setProductoEditado({ ...productoEditado, descripcion: e.target.value })}
                        style={{ width: '100%', padding: '4px' }}
                      />
                    ) : (
                      prod.descripcion
                    )}
                  </td>
                  <td>
                    {modoEdicion === prod.id_producto ? (
                      <input
                        type="number"
                        value={productoEditado.stock || 0}
                        onChange={e => setProductoEditado({ ...productoEditado, stock: e.target.value })}
                        style={{ width: '100%', padding: '4px' }}
                      />
                    ) : (
                      prod.stock
                    )}
                  </td>
                  <td>
                    {modoEdicion === prod.id_producto ? (
                      <input
                        type="number"
                        value={productoEditado.precio || 0}
                        onChange={e => setProductoEditado({ ...productoEditado, precio: e.target.value })}
                        style={{ width: '100%', padding: '4px' }}
                      />
                    ) : (
                      prod.precio
                    )}
                  </td>
                  <td>
                    {modoEdicion === prod.id_producto ? (
                      <input
                        value={productoEditado.imagen || ''}
                        onChange={e => setProductoEditado({ ...productoEditado, imagen: e.target.value })}
                        style={{ width: '100%', padding: '4px' }}
                      />
                    ) : (
                      prod.imagen ? (
                        <img src={prod.imagen} alt={prod.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                      ) : (
                        'Sin imagen'
                      )
                    )}
                  </td>
                  <td>
                    {modoEdicion === prod.id_producto ? (
                      <select
                        value={productoEditado.id_categoria || ''}
                        onChange={e => setProductoEditado({ ...productoEditado, id_categoria: e.target.value })}
                        style={{ width: '100%', padding: '4px' }}
                      >
                        <option value="">Selecciona</option>
                        {categorias.map(cat => (
                          <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
                        ))}
                      </select>
                    ) : (
                      getCategoriaNombre(prod.id_categoria)
                    )}
                  </td>
                  <td>
                    {modoEdicion === prod.id_producto ? (
                      <>
                        <button
                          onClick={() => guardarEdicion(prod.id_producto)}
                          title="Guardar"
                          style={{ marginRight: '8px', padding: '4px 8px' }}
                        >
                          💾
                        </button>
                        <button
                          onClick={() => {
                            setModoEdicion(null);
                            setProductoEditado({});
                          }}
                          title="Cancelar"
                          style={{ padding: '4px 8px' }}
                        >
                          ❌
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => iniciarEdicion(prod)}
                          title="Editar"
                          style={{ marginRight: '8px', padding: '4px 8px' }}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => eliminar(prod.id_producto)}
                          title="Eliminar"
                          style={{ padding: '4px 8px' }}
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListaProducto;
