  const { DataTypes, Model } = require('sequelize');
  const sequelize = require('../config/sequelizeConfig');
  const User = require("./UserModel")
  class Appointment extends Model {}

  Appointment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      problem: {
        type: DataTypes.STRING,
      },
      prescription: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      status: {
        type: DataTypes.STRING,
      },
      appointmentDate: {
        type: DataTypes.DATE,
      },
      date: {
        type: DataTypes.DATE,
      },
      token: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );

  module.exports = Appointment;
