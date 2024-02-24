const express = require("express");

const MedicineController = require("../controllers/MedicineController")
const errorHandler = require("../middlewares/errorHandler");
const upload = require("../middlewares/upload");
const router = express.Router();

// Route to add a new medicine (tested successfully)
router.post("/add", MedicineController.addMedicine);


// Route to view all medicines (tested successfully)
router.get("/view", MedicineController.viewMedicines);

// Route to search for medicines by medicine_name (tested successfully)
router.get("/search", MedicineController.searchMedicine);

// Route to add dosage to a medicine (tested successfully)
router.post("/addDosage", MedicineController.addDosageToMedicine);

router.use(errorHandler);

module.exports = router;
