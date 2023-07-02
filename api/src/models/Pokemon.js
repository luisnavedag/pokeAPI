const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png",
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 50
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 50
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 50
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, 
  {timestamps: false});
};
