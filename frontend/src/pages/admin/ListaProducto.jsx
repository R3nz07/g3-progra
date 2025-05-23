//Renzo
import React, { useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import BuscadorConBotones from '../../components/Lista/BuscadorConBotones';
import ProductosTable from '../../components/Table/ProductosTable';


export const ListaProducto = () => {
    const [busqueda, setBusqueda] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Buscando:', busqueda);
    };

    return (
        <>
            <TopBar handleSearch={handleSearch} busqueda={busqueda} setBusqueda={setBusqueda}/>
            <h1>Lista Producto</h1>
            <BuscadorConBotones
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                handleSearch={handleSearch}
            />
            <ProductosTable />
        </>
    );
};

export default ListaProducto;
