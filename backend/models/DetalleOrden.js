// models/DetalleOrden.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Orden } from "./Orden.js";
import { Producto } from "./Producto.js";

export const DetalleOrden = sequelize.define("DetalleOrden", {
  id_detalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: DataTypes.INTEGER,
  precio_unitario: DataTypes.DECIMAL(10, 2)
}, {
  freezeTableName: true
});

// Relaciones
DetalleOrden.belongsTo(Orden, { foreignKey: "id_orden" });
Orden.hasMany(DetalleOrden, { foreignKey: "id_orden" });

DetalleOrden.belongsTo(Producto, { foreignKey: "id_producto" });
Producto.hasMany(DetalleOrden, { foreignKey: "id_producto" });
