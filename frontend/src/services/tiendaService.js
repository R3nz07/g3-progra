const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Funciones para productos
export const CrearProducto = async (id,nombre, stock, precio) => {
    try {
        const response = await fetch(`${API_URL}/productos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id,nombre,stock,precio}),
        });
        if (!response.ok) {
            throw new Error("Error al crear el producto");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
export const BorrarProducto = async (id) => {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al borrar el producto");
        }
    } catch (error) {
        console.error(error);
    }
}

export const ObtenerProductoPorId = async (id) => {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`);
        if (!response.ok) {
            throw new Error("Error al obtener el producto");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
export const ActualizarProducto = async (id, producto) => {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });
        if (!response.ok) {
            throw new Error("Error al actualizar el producto");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Funciones para Usuario
export const CrearUsuario = async (usuario) => {
    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        });
        if (!response.ok) {
            throw new Error("Error al crear el usuario");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const BorrarUsuario = async (id) => {
    try {
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al borrar el usuario");
        }
    } catch (error) {
        console.error(error);
    }
}

export const ObtenerUsuarioPorId = async (id) => {
    try {
        const response = await fetch(`${API_URL}/usuarios/${id}`);
        if (!response.ok) {
            throw new Error("Error al obtener el usuario");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const ActualizarUsuario = async (id, usuario) => {
    try {
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        });
        if (!response.ok) {
            throw new Error("Error al actualizar el usuario");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
//Funciones Login Usuario
export const LoginUsuario = async (usuario) => {
    try {
        const response = await fetch(`${API_URL}/usuarios/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        });
        if (!response.ok) {
            throw new Error("Error al iniciar sesión");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

//Funciones para Carrito
export const ObtenerCarrito = async (usuarioId) => {
    try {
        const response = await fetch(`${API_URL}/carrito/${usuarioId}`);
        if (!response.ok) {
            throw new Error("Error al obtener el carrito");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const AgregarProductoAlCarrito = async (usuarioId, productoId) => {
    try {
        const response = await fetch(`${API_URL}/carrito/${usuarioId}/productos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productoId }),
        });
        if (!response.ok) {
            throw new Error("Error al agregar el producto al carrito");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const EliminarProductoDelCarrito = async (usuarioId, productoId) => {
    try {
        const response = await fetch(`${API_URL}/carrito/${usuarioId}/productos/${productoId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al eliminar el producto del carrito");
        }
    } catch (error) {
        console.error(error);
    }
}

export const ActualizarProductoEnCarrito = async (usuarioId, productoId, cantidad) => {
    try {
        const response = await fetch(`${API_URL}/carrito/${usuarioId}/productos/${productoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cantidad }),
        });
        if (!response.ok) {
            throw new Error("Error al actualizar el producto en el carrito");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}   

export const LimpiarCarrito = async (usuarioId) => {
    try {
        const response = await fetch(`${API_URL}/carrito/${usuarioId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al limpiar el carrito");
        }
    } catch (error) {
        console.error(error);
    }
}   

export const crearOrden = async (ordenData) => {
    try {
        const response = await fetch(`${API_URL}/ordenes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ordenData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al crear la orden");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error al crear orden:", error);
        throw error;
    }
};   
