import React, { useState } from "react";
import axios from "axios";

const AddMedicine = () => {
  const [medicine_name, setMedicineName] = useState("");
  const [company_name, setManufacturer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:5000/api/medicine/add",
        {
          medicine_name,
          company_name,
        }
      );

      console.log(response.data); // Log the response data

      // Optionally, you can add logic to handle success or navigate to another page
      alert("Medicine added successfully!");
    } catch (error) {
      console.error("Error adding medicine:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>Add Medicine</h2>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="medicineName"
            style={{ fontWeight: "bold", marginBottom: "5px" }}
          >
            Medicine Name:
          </label>
          <input
            type="text"
            id="medicineName"
            value={medicine_name}
            onChange={(e) => setMedicineName(e.target.value)}
            style={{
              padding: "8px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="manufacturer"
            style={{ fontWeight: "bold", marginBottom: "5px" }}
          >
            Manufacturer:
          </label>
          <input
            type="text"
            id="manufacturer"
            value={company_name}
            onChange={(e) => setManufacturer(e.target.value)}
            style={{
              padding: "8px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;
