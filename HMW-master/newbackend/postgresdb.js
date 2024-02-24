const { Pool } = require("pg");
const { DataTypes, Model } = require("sequelize");
const sequelize = require("./config/sequelizeConfig");
const pool = new Pool({
  user: "ammar",
  host: "localhost",
  database: "hospital",
  password: "test1234",
  port: 5432,
});

// // Create 'Users' table ALTER DATABASE hospital OWNER TO ammar;
// Done
// pool.query(
//   `CREATE TABLE IF NOT EXISTS Users (
//     id SERIAL PRIMARY KEY,
//     firstName VARCHAR(255),
//     lastName VARCHAR(255),
//     age INT,
//     gender VARCHAR(10),
//     bloodGroup VARCHAR(10),
//     emailId VARCHAR(255),
//     contact VARCHAR(15),
//     street VARCHAR(255),
//     city VARCHAR(255),
//     pincode INT,
//     password VARCHAR(255),
//     role VARCHAR(20),
//     specialist VARCHAR(255),
//     status VARCHAR(20),
//     doctorImage VARCHAR(255),
//     experience VARCHAR(255),
//     available BOOLEAN DEFAULT FALSE
//   );

// `,
//   (err, result) => {
//     if (err) {
//       console.error("Error creating users table:", err);
//     } else {
//       console.log("Users table has been created successfully");
//     }
//   }
// );

// // // //
// // // Create Medicine table
// pool.query(
//   `
//   CREATE TABLE IF NOT EXISTS Medicine (
//     id SERIAL PRIMARY KEY,
//     medicine_name VARCHAR(255) UNIQUE,
//     company_name VARCHAR(255)

//   );
// `,
//   (err, result) => {
//     if (err) {
//       console.error("Error creating medicine table:", err);
//     } else {
//       console.log("Medicine table created successfully");
//     }
//   }
// );

// // create Medicine to Appointment many to many relationship table

// // // Create Dosage table medicine to dosage one to many
// pool.query(
//   `
//   CREATE TABLE IF NOT EXISTS Dosage (
//     id SERIAL PRIMARY KEY,
//     medicine_id INT REFERENCES medicine(id),
//     dosage_value VARCHAR(255)
//   );
// `,
//   (err, result) => {
//     if (err) {
//       console.error("Error creating dosage table:", err);
//     } else {
//       console.log("Dosage table created successfully");
//     }
//   }
// );

// // // // Create 'Appointments' table
// pool.query(
//   `
//   CREATE TABLE IF NOT EXISTS Appointments (
//     id SERIAL PRIMARY KEY,
//     patientId INT REFERENCES users(id),
//     doctorId INT REFERENCES users(id),
//     problem VARCHAR(255),
//     prescription TEXT,
//     price FLOAT,
//     status VARCHAR(20),
//     appointmentDate TIMESTAMPTZ,
//     date TIMESTAMPTZ,
//     token INT
//   );
// `,
//   (err, result) => {
//     if (err) {
//       console.error("Error creating appointments table:", err);
//     } else {
//       console.log("Appointments table created successfully");
//     }
//   }
// );

// pool.query(
//   `
// CREATE TABLE IF NOT EXISTS AppointmentMedicine (
//     appointmentId INT REFERENCES appointments(id),
//     medicineId INT REFERENCES medicine(id),
//     PRIMARY KEY (appointmentId, medicineId)
// );
// `,
//   (err, result) => {
//     if (err) {
//       console.error("Error creating AppointmentMedicine table:", err);
//     } else {
//       console.log("AppointmentMedicine table created successfully");
//     }
//   }
// );

// fi tables has been created

const showTablesQuery = `
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public' -- You may need to adjust the schema based on your setup
    AND table_type = 'BASE TABLE';
`;

pool.query(showTablesQuery, (err, result) => {
  if (err) {
    console.error("Error retrieving table list:", err);
  } else {
    const tables = result.rows.map((row) => row.table_name);
    console.log("Tables in the database:", tables);
  }
});

// pool.query(
//   `
// DROP TABLE IF EXISTS Users Cascade;

// `,
//   (err, result) => {
//     if (err) {
//       console.error("Error creating appointments table:", err);
//     } else {
//       console.log("Appointments table deleted successfully");
//     }

//     // Close the pool
//     pool.end();
//   }
// );


