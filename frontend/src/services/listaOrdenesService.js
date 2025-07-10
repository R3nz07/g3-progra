const API_URL = import.meta.env.VITE_API_URL;

export const obtenerOrdenes = async () => {
  const res = await fetch(`${API_URL}/listaordenes`);
  if (!res.ok) throw new Error('Error al obtener órdenes');
  return await res.json();
};

export async function obtenerOrdenPorId(id_orden) {
  const res = await fetch(`${API_URL}/listaordenes/${id_orden}`);
  if (!res.ok) throw new Error('Error al obtener orden');
  return await res.json();
}