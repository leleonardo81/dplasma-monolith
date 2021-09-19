module.exports = (sequelize, DataTypes) => {
  const DonorRequest = sequelize.define('DonorRequest', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    uid: DataTypes.STRING,
    rsid: DataTypes.STRING,
    status: DataTypes.STRING,
    bloodtype: DataTypes.STRING,
    age: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  DonorRequest.associate = function(models) {
    DonorRequest.hospital = DonorRequest.belongsTo(models.Hospital, {foreignKey: 'rsid', as: 'hospital'});
    
  };
  return DonorRequest;
};