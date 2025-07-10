import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBarAdmin from '../../components/TopBar/TopBarAdmin';
import OrdenDetalleCard from '../../components/Table/OrdenDetalleCard';
import { obtenerOrdenPorId } from '../../services/listaOrdenesService';

const DetalleOrden = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        const data = await obtenerOrdenPorId(id);
        const adaptada = {
          ...data,
          id: data.id_orden,
        };
        setOrden(adaptada);
      } catch (error) {
        console.error('Error al obtener orden:', error);
      }
    };
    fetchOrden();
  }, [id]);

  if (!orden) return <p>Orden no encontrada</p>;

  return (
    <>
      <TopBarAdmin busqueda={busqueda} setBusqueda={setBusqueda} handleSearch={(e) => e.preventDefault()} />
      <h1 style={{ margin: '20px 30px' }}>Detalle de la Orden</h1>
      <OrdenDetalleCard orden={orden} />
    </>
  );
};

export default DetalleOrden;