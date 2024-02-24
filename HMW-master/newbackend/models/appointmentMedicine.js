const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelizeConfig");
const Appointment = require("./AppointmentModel"); // Import the Appointment model
const Medicine = require("./MedicineModel"); // Import the Medicine model

class AppointmentMedicine extends Model {}

AppointmentMedicine.init(
  {
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Appointment,
        key: "id",
      },
    },
    medicineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medicine,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "AppointmentMedicine",
    indexes: [
      {
        unique: true,
        fields: ["appointmentId", "medicineId"],
      },
    ],
  }
);

// Define associations
AppointmentMedicine.belongsTo(Appointment, { foreignKey: "appointmentId" });
AppointmentMedicine.belongsTo(Medicine, { foreignKey: "medicineId" });

module.exports = AppointmentMedicine;
