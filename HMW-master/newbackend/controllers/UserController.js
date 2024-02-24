// UserController.js
const { User } = require("../models");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { Op } = require("sequelize");
const upload = require("../middlewares/upload");
// Synchronize the User model with the database
User.sync()
  .then(() => {
    console.log("User model synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing User model:", error);
  });

exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await User.findAll({
      where: { role: "doctor" },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "emailId",
        "experience",
        "gender",
        "age",
        "specialist",
        "doctorImage",
        "available",
        "street",
        "city",
        "pincode",
      ],
    });

    res.json(doctors);
  } catch (err) {
    next(err);
  }
};

exports.getAllSpecialistDoctors = async (req, res, next) => {
  try {
    const specialistDoctors = await User.findAll({
      where: {
        role: "doctor",
        specialist: {
          [Op.not]: null,
        },
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "emailId",
        "specialist",
        "available",
      ],
    });

    res.json(specialistDoctors);
  } catch (err) {
    console.log("HERE IS ERROR RRRRRRRRRRRRRR", err);
    next(err);
  }
};

// const upload = multer({ storage: storage });

exports.registerDoctor = async (req, res, next) => {
  try {
    // Extract fields from the request body

    const {
      firstName,
      lastName,
      emailId,
      password,
      contact,
      street,
      city,
      pincode,
      role,
      age,
      gender,
      specialist,
      experience,
      imagePath,

      bloodGroup,
    } = req.body;
    console.log("Password is ^^^^^^^^^^^^^^^^^^^^^^", password);
    console.log("wholre reequest,  ", req.body);

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !emailId ||
      !password ||
      !contact ||
      !street ||
      !city ||
      !pincode ||
      !role ||
      !age ||
      !gender
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Extract the filename of the uploaded image from the request

    // Create a new doctor
    const doctor = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      contact,
      street,
      city,
      pincode,
      role,
      age,
      gender,
      specialist,
      experience,
      doctorImage: imagePath,
      gender,
      bloodGroup,
    });

    // Send the created doctor as a response
    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { emailId, password } = req.body;

    // Check if the user with the provided email exists
    console.log(emailId, password);
    const user = await User.findOne({ where: { emailId: emailId } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database

    console.log("Running successfully");
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid email or password dscvcvc" });
    }

    // Create a JWT token for authentication
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send the user data and token as a response
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.userRegister = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      contact,
      street,
      city,
      pincode,
      role = "patient", // Default role is set to 'patient'
      age,
      gender,
      bloodGroup,
    } = req.body;

    console.log("working fine here");

    // Check if a user with the provided email already exists
    try {
      const existingUser = await User.findOne({ where: { emailId } });
    } catch (e) {
      console.log("WE are having this error ", e);
      res.status(400).json({ Error: e });
    }

    const existingUser = await User.findOne({ where: { emailId } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already exists. Please use a different email." });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      contact,
      street,
      city,
      pincode,
      role,
      age,
      gender,
      bloodGroup,
    });

    res.status(201).json({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.emailId,
      role: newUser.role,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await User.findAll({
      where: { role: "patient" },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "emailId",
        "contact",
        "age",
        "gender",
        "bloodGroup",
        "street",
        "city",
        "pincode",
      ],
    });

    res.json(patients);
  } catch (err) {
    next(err);
  }
};

exports.getPatientById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const patient = await User.findOne({
      where: { id, role: "patient" },
      attributes: ["id", "firstName", "lastName", "emailId", "contact"],
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    next(err);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    console.log("here we recive the user id,,  ", userId);
    const user = await User.findByPk(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user
    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.updateUserAvailability = async (req, res, next) => {
  try {
    const { userId, available } = req.body;
    const user = await User.findByPk(Number(userId));

    if (!user) {
      res.json({ message: "User not found" });
    }

    user.available = available;
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
