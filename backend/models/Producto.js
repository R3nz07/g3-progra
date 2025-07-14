import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Categoria } from "./Categoria.js";

export const Producto = sequelize.define("Producto", {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  presentacion: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  imagen: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName:"producto",
  freezeTableName: true,
  timestamps: false
});

Producto.belongsTo(Categoria, { foreignKey: "id_categoria" });
Categoria.hasMany(Producto, { foreignKey: "id_categoria" });
