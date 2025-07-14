import React, { useState } from 'react';

function AgregarCategoria({ onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const manejarEnvio = e => {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) return;

    onAgregar({ nombre, descripcion });
    setNombre('');
    setDescripcion('');
  };

  return (
    <form onSubmit={manejarEnvio} className="space-y-4" style={{ maxWidth: '400px' }}>
      <div>
        <label className="block text-sm font-medium">Nombre XD</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
      >
        ➕ Crear categoría
      </button>
    </form>
  );
}

export default AgregarCategoria;
