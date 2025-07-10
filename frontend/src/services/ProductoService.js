// URL del backend desde variables de entorno
const api = import.meta.env.VITE_API_URL;

console.log('=== DEBUG INFO ===');
console.log('import.meta.env:', import.meta.env);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('API URL final:', api);
console.log('==================');

export async function fetchProductos() {
  try {
    console.log('Intentando obtener productos desde:', `${api}/productos`);
    const response = await fetch(`${api}/productos`);
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error al obtener productos: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Productos obtenidos:', data);
    return data;
  } catch (error) {
    console.error('fetchProductos error:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('No se puede conectar al servidor. Verifica que el backend esté ejecutándose.');
    }
    throw error;
  }
}

export async function createProducto(productoData) {
  try {
    console.log('Intentando crear producto:', productoData);
    
    const response = await fetch(`${api}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: productoData.nombre,
        presentacion: productoData.presentacion,
        descripcion: productoData.descripcion,
        stock: Number(productoData.stock),
        precio: Number(productoData.precio),
        imagen: productoData.imagen,
        id_categoria: Number(productoData.id_categoria)
      }),
    });

    console.log('Create response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear producto');
    }

    const result = await response.json();
    console.log('Producto creado:', result);
    return result;
  } catch (error) {
    console.error('createProducto error:', error);
    throw error;
  }
}

export async function updateProducto(id, productoData) {
  try {
    const response = await fetch(`${api}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoData),
    });

    if (!response.ok) throw new Error('Error al actualizar producto');
    return await response.json();
  } catch (error) {
    console.error('updateProducto error:', error);
    throw error;
  }
}

export async function deleteProducto(id) {
  try {
    const response = await fetch(`${api}/productos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      // Mostrar el mensaje real del backend
      const errorText = await response.text();
      throw new Error(errorText || 'Error al eliminar producto');
    }

    // Solo intenta leer JSON si hay contenido
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error('deleteProducto error:', error);
    throw error;
  }
}

export async function fetchCategorias() {
  const response = await fetch(`${api}/categorias`);
  if (!response.ok) throw new Error('Error al obtener categorías');
  return await response.json();
}
