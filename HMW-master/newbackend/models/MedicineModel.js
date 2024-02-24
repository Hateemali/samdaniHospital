const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelizeConfig");
// const Dosage = require("./DosageModel"); // Import the Dosage model

class Medicine extends Model {}

Medicine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    medicine_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add other columns as needed
  },
  {
    sequelize,
    modelName: "Medicine",
  }
);

// Define association with Dosage model
// Medicine.hasMany(Dosage, { foreignKey: "medicine_id" });

module.exports = Medicine;
