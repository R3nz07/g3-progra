const api = import.meta.env.VITE_API_URL;

// Obtener todos los usuarios
export async function obtenerUsuarios() {
  const res = await fetch(`${api}/usuarios`);
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}

// Obtener usuario por ID
export async function obtenerUsuarioPorId(id) {
  const res = await fetch(`${api}/usuarios/${id}`);
  if (!res.ok) throw new Error('Usuario no encontrado');
  return res.json();
}

// Crear un nuevo usuario
export async function crearUsuario(datos) {
  const res = await fetch(`${api}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al crear usuario');
  }
  
  return res.json();
}

// Iniciar sesión
export async function loginUsuario({ correo, contrasena }) {
  const res = await fetch(`${api}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contrasena }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error en el login');
  }
  
  return res.json();
}

// Actualizar datos de perfil
export async function actualizarUsuario(id, datos) {
  const res = await fetch(`${api}/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al actualizar usuario');
  }
  
  return res.json();
}

// Cambiar contraseña
export async function cambiarContrasena(id, datos) {
  const res = await fetch(`${api}/usuarios/${id}/cambiar-contrasena`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al cambiar la contraseña');
  }
  
  return res.json();
}

// Eliminar usuario
export async function eliminarUsuario(id) {
  const res = await fetch(`${api}/usuarios/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al eliminar usuario');
  }
}

export async function updateDireccionUsuario(id_usuario, direccion) {
  try {
    const res = await fetch(`${api}/usuarios/${id_usuario}/direccion`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(direccion)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'No se pudo actualizar la dirección');
    }
    
    const data = await res.json();
    return data.usuario; // Return the updated user data
  } catch (error) {
    console.error('Error updating user address:', error);
    throw error;
  }
}

export async function getDireccionUsuario(id_usuario) {
  try {
    const res = await fetch(`${api}/usuarios/${id_usuario}/direccion`);
    if (!res.ok) {
      if (res.status === 404) {
        return null; // Return null if no address found
      }
      throw new Error('No se pudo obtener la dirección');
    }
    const data = await res.json();
    
    // Check if the address fields are empty/null
    if (!data.departamento && !data.ciudad && !data.direccion && !data.codigoPostal && !data.telefono) {
      return null; // Return null if all address fields are empty
    }
    
    return data;
  } catch (error) {
    console.error('Error getting user address:', error);
    return null; // Return null on any error
  }
}