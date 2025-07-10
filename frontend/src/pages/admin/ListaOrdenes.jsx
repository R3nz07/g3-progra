import React, { useState, useEffect } from 'react';
import TopBarAdmin from '../../components/TopBar/TopBarAdmin';
import BuscadorOrdenes from '../../components/Lista/BuscadorOrdenes';
import OrdenesTable from '../../components/Table/OrdenesTable';
import { obtenerOrdenes } from '../../services/listaOrdenesService';

const ListaOrdenes = () => {
  const [busqueda, setBusqueda] = useState('');
  const [ordenes, setOrdenes] = useState([]);
  const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      const data = await obtenerOrdenes();
      setOrdenes(data);
      setOrdenesFiltradas(data);
    };
    fetchOrdenes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const resultado = ordenes.filter((o) =>
      o.id_orden?.toString().includes(busqueda.toLowerCase()) ||
      o.usuario?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setOrdenesFiltradas(resultado);
  };

  return (
    <>
      <TopBarAdmin busqueda={busqueda} setBusqueda={setBusqueda} />
      <h1 style={{ margin: '20px 30px' }}>Lista de Órdenes</h1>
      <BuscadorOrdenes busqueda={busqueda} setBusqueda={setBusqueda} handleSearch={handleSearch} />
      <OrdenesTable ordenes={ordenesFiltradas} />
    </>
  );
};

export default ListaOrdenes;
