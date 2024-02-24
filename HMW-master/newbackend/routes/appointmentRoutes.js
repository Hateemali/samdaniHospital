const express = require("express");
const AppointmentController = require("../controllers/AppointmentController");
const errorHandler = require("../middlewares/errorHandler");
const upload = require("../middlewares/upload");
const router = express.Router();

// GET specific appointment by ID tested
router.get("/id", AppointmentController.getAppointmentById);

// GET all appointments tested
router.get("/all", AppointmentController.getAllAppointments);

// Apply error handling middleware

// GET appointments by patient ID tested
router.get("/patient/id", AppointmentController.getAppointmentsByPatientId);

// GET appointments by doctor ID tested
router.get("/doctor/id", AppointmentController.getAppointmentsByDoctorId);

// POST create appointment for patient (tested)
router.post("/patient/add", AppointmentController.createAppointmentForPatient);

// POST assign doctor to appointment
router.post(
  "/admin/assign/doctor",
  AppointmentController.assignDoctorToAppointment
);

// POST update appointment by doctor tested
router.post("/doctor/update", AppointmentController.updateAppointmentByDoctor);

// POST cancel appointment by patient tested
router.post(
  "/patient/update",
  AppointmentController.cancelAppointmentByPatient
);

router.use(errorHandler);

module.exports = router;
