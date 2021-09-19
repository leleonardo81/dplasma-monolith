
module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define('Hospital', {
    rsid: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    address_id: DataTypes.STRING
  }, {
    defaultScope: {
      attributes: { exclude: ['address_id'] },
    }
  },);
  Hospital.associate = function(models) {
    Hospital.address = Hospital.belongsTo(models.Address, {foreignKey: 'address_id', as: 'address'});
    Hospital.requests = Hospital.hasMany(models.DonorRequest, { foreignKey: 'rsid', as: 'requests' });
  };
  return Hospital;
};