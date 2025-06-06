import { useState } from 'react';

export const useProductoForm = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    presentacion: '',
    categoria: '',
    descripcion: '',
    stock: 0,
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleStockChange = (e) => {
    setProducto((prev) => ({ ...prev, stock: parseInt(e.target.value) }));
  };

  const handleImagenChange = (e) => {
    setProducto((prev) => ({ ...prev, imagen: e.target.files[0] }));
  };

  const resetForm = () => {
    setProducto({
      nombre: '',
      presentacion: '',
      categoria: '',
      descripcion: '',
      stock: 0,
      imagen: null,
    });
  };

  return {
    producto,
    setProducto,
    handleChange,
    handleStockChange,
    handleImagenChange,
    resetForm,
  };
};
