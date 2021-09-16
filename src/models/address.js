'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    detail: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
  };
  return Address;
};