const express = require("express");
const UserController = require("../controllers/UserController");

const errorHandler = require("../middlewares/errorHandler");
const upload = require("../middlewares/upload");
const router = express.Router();

// GET all doctors (tested)
router.get("/doctor/all", UserController.getAllDoctors);

// GET all specialist doctors (TESTED)
router.get("/doctor/specialist/all", UserController.getAllSpecialistDoctors);

// POST register a new doctor (tested)
router.post("/doctor/register", UserController.registerDoctor);

// POST change availability status (tested)
router.post(
  "/doctor/updateAvailability",
  UserController.updateUserAvailability
);

// POST user login (tested)
router.post("/user/login", UserController.userLogin);

// POST request for uploading Image (tested)
router.post("/doctor/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  const info = req.body.description;
  const finalURL = `https://d3qaaxi5x0dao4.cloudfront.net/${file.key}`;

  console.log(file);
  res.header("Content-Type", "multipart/form-data");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.send(JSON.stringify({ link: finalURL }));
});

// POST user register (tested)
router.post("/user/register", UserController.userRegister);

// GET all patients (tested)
router.get("/patient/all", UserController.getAllPatients);

// GET specific Patient by ID (tested)
router.get("/patient/id", UserController.getPatientById);

// DELETE user by ID (tested)
router.delete("/delete/id", UserController.deleteUserById);

// Apply error handling middleware

//Medicine Routes

router.use(errorHandler);

module.exports = router;

// geneder add
// 3 patients
