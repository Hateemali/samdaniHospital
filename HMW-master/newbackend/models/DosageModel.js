const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelizeConfig");
const Medicine = require("./MedicineModel"); // Import the Medicine model

class Dosage extends Model {}

Dosage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    medicine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medicine,
        key: "id",
      },
    },
    dosage_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add other columns as needed
  },
  {
    sequelize,
    modelName: "Dosage",
  }
);

// Define association with Medicine model
// Dosage.belongsTo(Medicine, { foreignKey: "medicine_id" });

module.exports = Dosage;
