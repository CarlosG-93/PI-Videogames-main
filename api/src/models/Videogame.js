const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripción: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plataformas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Imagen: {
      type: DataTypes.TEXT,
      allowNull: false,
      isUrl: true
    },
    lanzamiento: {
      type: DataTypes.STRING,
      allowNull: false,
      isDate: true
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
    {
      timestamps: false
    });
};
