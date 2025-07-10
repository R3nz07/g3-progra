import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      // Recupera el carrito desde localStorage al cargar la página
      const savedCart = localStorage.getItem('cart');
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      
      // Verificar que sea un array válido
      if (!Array.isArray(parsedCart)) {
        console.warn('Cart data in localStorage is not an array, resetting to empty array');
        return [];
      }
      
      return parsedCart;
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  });

  // Juegos seleccionados (IDs)
  const [selectedIds, setSelectedIds] = useState(() => {
    try {
      const savedSelectedIds = localStorage.getItem('selectedIds');
      const parsedSelectedIds = savedSelectedIds ? JSON.parse(savedSelectedIds) : [];
      
      if (!Array.isArray(parsedSelectedIds)) {
        return [];
      }
      
      return parsedSelectedIds;
    } catch (error) {
      console.error('Error parsing selectedIds from localStorage:', error);
      return [];
    }
  });

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      console.error('Invalid product data:', product);
      return;
    }
    
    const exists = cart.find(p => p.id === product.id);
    if (exists) {
      setCart(cart.map(p =>
        p.id === product.id
          ? { ...p, quantity: p.quantity + quantity }
          : p
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  // Actualizar los seleccionados
  const updateSelectedIds = (ids) => {
    if (!Array.isArray(ids)) {
      console.error('updateSelectedIds received non-array:', ids);
      return;
    }
    setSelectedIds(ids);
  };

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Guardar selectedIds en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('selectedIds', JSON.stringify(selectedIds));
    } catch (error) {
      console.error('Error saving selectedIds to localStorage:', error);
    }
  }, [selectedIds]);

  const contextValue = {
    cart: Array.isArray(cart) ? cart : [],
    addToCart,
    removeFromCart,
    clearCart,
    selectedIds: Array.isArray(selectedIds) ? selectedIds : [],
    updateSelectedIds
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCarrito = () => useContext(CartContext);
