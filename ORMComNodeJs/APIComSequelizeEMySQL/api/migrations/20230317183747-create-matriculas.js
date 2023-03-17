'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Matriculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estudante_id:{
        type: Sequelize.INTEGER, 
        allowNull: false,
        references:{model:'Pessoas', key:'id'}
      },
      status: {
        type: Sequelize.STRING
      },
      turma_id:{
        type: Sequelize.INTEGER, 
        allowNull: false,
        references:{model:'Turmas', key:'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Matriculas');
  }
};