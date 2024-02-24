const User = require("./UserModel");
const Appointment = require("./AppointmentModel");
const Dosage = require("./DosageModel");
const Medicine = require("./MedicineModel");
const AppointmentMedicine = require("./appointmentMedicine");
// Define associations between models if needed
User.hasMany(Appointment, { foreignKey: "patientId" });
User.hasMany(Appointment, { foreignKey: "doctorId" });

Appointment.belongsTo(User, { foreignKey: "patientId", as: "patient" });
Appointment.hasMany(AppointmentMedicine, { foreignKey: "appointmentId" });
// Define the association for the doctor
Appointment.belongsTo(User, { foreignKey: "doctorId", as: "doctor" });

Medicine.hasMany(Dosage, { foreignKey: "medicine_id" });

Dosage.belongsTo(Medicine, { foreignKey: "medicine_id" });

// Appointment.belongsToMany(Medicine, { through: AppointmentMedicine });
// Medicine.belongsToMany(Appointment, { through: AppointmentMedicine });


module.exports = {
  User,
  Appointment,
  AppointmentMedicine,
  Medicine,
  Dosage,
};
