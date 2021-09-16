module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      uid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nik: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      defaultScope: {
        attributes: { exclude: ['nik'] },
      }
    },
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
