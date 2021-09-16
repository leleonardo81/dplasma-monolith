

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    uid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nik: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
