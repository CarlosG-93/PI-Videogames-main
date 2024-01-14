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
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      isUrl: true
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
      isDate: true
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    genre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
    {
      timestamps: false
    });
};
