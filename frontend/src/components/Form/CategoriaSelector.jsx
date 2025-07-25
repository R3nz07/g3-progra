import React from 'react';
import styles from './CategoriaSelector.module.css';

const CategoriaSelector = ({ value, onChange, categorias, onAgregarCategoria }) => {
  return (
    <div className={styles.categoriaGroup}>
      <label>Categoría</label>
      <div className={styles.categoriaRow}>
        <select
          name="id_categoria"
          value={value}
          onChange={onChange}
          className={styles.select}
        >
          {categorias.length === 0 ? (
            <option value="">Selecciona la categoría del producto</option>
          ) : (
            categorias.map((cat, index) => (
              <option key={index} value={cat.id_categoria}>
                {cat.nombre}
              </option>
            ))
          )}
        </select>
        <button
          type="button"
          className={styles.agregarBtn}
          onClick={onAgregarCategoria}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CategoriaSelector;
