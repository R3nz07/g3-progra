// controllers/listaordenesController.js
import { Orden } from '../models/Orden.js';
import { Usuario } from '../models/Usuario.js';
import { DetalleOrden } from '../models/DetalleOrden.js';
import { Producto } from '../models/Producto.js';

// GET - todas las órdenes
export const getAllOrders = async (req, res) => {
  try {
    const ordenes = await Orden.findAll({
      include: {
        model: Usuario,
        attributes: ['nombre', 'apellido']
      },
      order: [['id_orden', 'DESC']]
    });

    const resultado = ordenes.map(orden => ({
      id: orden.id_orden,
      usuario: `${orden.Usuario?.nombre || 'Sin'} ${orden.Usuario?.apellido || 'nombre'}`,
      fecha: orden.fecha,
      total: parseFloat(orden.total),
      estado: orden.estado,
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error getAllOrders:', error.message);
    res.status(500).json({ error: 'Error al obtener órdenes', detalles: error.message });
  }
};

// GET - detalle de orden por ID
export const getOrderById = async (req, res) => {
  try {
    const orden = await Orden.findOne({
      where: { id_orden: req.params.id },
      include: [
        {
          model: Usuario,
          attributes: ['nombre', 'apellido', 'correo']
        },
        {
          model: DetalleOrden,
          include: {
            model: Producto,
            attributes: ['id_producto', 'nombre', 'id_categoria', 'precio'],
            include: {
              model: require('../models/Categoria.js').Categoria,
              attributes: ['nombre']
            }
          }
        }
      ]
    });

    if (!orden) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    const productos = orden.DetalleOrdens.map((detalle) => ({
      id: detalle.Producto.id_producto,
      nombre: detalle.Producto.nombre,
      categoria: detalle.Producto.Categoria?.nombre || detalle.Producto.id_categoria,
      cantidad: detalle.cantidad,
      precio: parseFloat(detalle.precio_unitario)
    }));

    const detalle = {
      id: orden.id_orden,
      estado: orden.estado,
      total: parseFloat(orden.total),
      usuario: `${orden.Usuario?.nombre || 'Usuario'} ${orden.Usuario?.apellido || ''}`,
      correo: orden.Usuario?.correo || 'Sin correo',
      productos
    };

    res.json(detalle);
  } catch (error) {
    console.error('Error getOrderById:', error.message);
    res.status(500).json({ error: 'Error al obtener la orden', detalles: error.message });
  }
};
