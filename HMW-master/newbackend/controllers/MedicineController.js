const {
  Appointment,
  User,
  Medicine,
  Dosage,
  AppointmentMedicine,
} = require("../models/index");
const { Op } = require("sequelize");
User.sync()
  .then(() => {
    console.log("User model synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing User model:", error);
  });

Appointment.sync()
  .then(() => {
    console.log("Appointment model synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing Appointment model:", error);
  });

Medicine.sync()
  .then(() => {
    console.log("Medicine model synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing Medicine model:", error);
  });

Dosage.sync()
  .then(() => {
    console.log("Dosage model synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing Dosage model:", error);
  });

AppointmentMedicine.sync()
  .then(() => {
    console.log("AppointmentMedicine model synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing AppointmentMedicine model:", error);
  });

// Function to add a new medicine 
exports.addMedicine = async (req, res, next) => {
  try {
    const medicineData = req.body;
    const newMedicine = await Medicine.create(medicineData);
    res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      medicine: newMedicine,
    });
  } catch (error) {
    next(error);
  }
};

// Function to view all medicines 
exports.viewMedicines = async (req, res, next) => {
  try {
    const medicines = await Medicine.findAll({
      include: Dosage, // Include Dosage information
      logging: console.log,
    });
    res.status(200).json({
      success: true,
      medicines,
    });
  } catch (error) {
    console.log("Error is this :", error)
    next(error);
  }
};

// Function to search for medicines by medicine_name
exports.searchMedicine = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;
    const matchingMedicines = await Medicine.findAll({
      where: {
        medicine_name: {
          [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
        },
      },
      include: Dosage, // Include Dosage information
    });
    res.status(200).json({
      success: true,
      matchingMedicines,
    });
  } catch (error) {
    next(error);
  }
};

exports.addDosageToMedicine = async (req, res, next) => {
  try {
    const { medicineId, dosageValue } = req.body;
    console.log("Medicine ID:", medicineId);
    console.log("Dosage Value:", dosageValue);

    // Check if the medicine exists
    const medicine = await Medicine.findByPk(medicineId);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    // console.log(medicine);
    // Create a new dosage for the medicine
    try {
      const newDosage = await Dosage.create({
        medicine_id: Number(medicineId),
        dosage_value: dosageValue,
      });
      res.status(201).json({
        success: true,
        message: "Dosage added to medicine successfully",
        dosage: newDosage,
      });
    } catch (e) {
      console.log("Error is ", e);
      res.status(201).json({
        success: false,
        message: "Error occured ",
      });
    }
  } catch (error) {
    next(error);
  }
};
