import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Prescription() {
  const [prescriptionData, setPrescriptionData] = useState(null);
  const { appointmentId } = useParams();
  const prescriptionRef = useRef(null);
  useEffect(() => {
    // Define the function inside the useEffect
    const fetchPrescriptionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/appointments/id?appointmentId=${appointmentId}`
        );
        const data = await response.json();
        setPrescriptionData(data);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
        // Handle error
      }
    };

    // Call the function
    fetchPrescriptionData();
  }, [appointmentId]); // Make sure to include appointmentId as a dependency

  const downloadPDF = () => {
    const input = prescriptionRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("prescription.pdf");
    });
  };

  if (!prescriptionData) {
    return <p>Loading...</p>;
  }

  const {
    patient,
    doctor,
    problem,
    prescription,
    status,
    appointmentDate,
    createdAt,
    updatedAt,
    AppointmentMedicines,
  } = prescriptionData;

  return (
    <div>
      <button style={styles.button} onClick={downloadPDF}>
        Download Prescription PDF
      </button>
      <div style={styles.container} ref={prescriptionRef}>
        <h2 style={styles.heading}>Prescription Details</h2>

        <div style={styles.section}>
          <h3 style={styles.subheading}>Patient Information</h3>
          <p>
            <strong>Name:</strong> {`${patient.firstName} ${patient.lastName}`}
          </p>
          <p>
            <strong>Email:</strong> {patient.emailId}
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.subheading}>Doctor Information</h3>
          <p>
            <strong>Name:</strong> {`${doctor.firstName} ${doctor.lastName}`}
          </p>
          <p>
            <strong>Email:</strong> {doctor.emailId}
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.subheading}>Appointment Details</h3>
          <p>
            <strong>Problem:</strong> {problem}
          </p>
          <p>
            <strong>Prescription:</strong> {prescription}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Appointment Date:</strong>{" "}
            {new Date(appointmentDate).toLocaleString()}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.subheading}>Medicines</h3>
          <ul>
            {AppointmentMedicines.map((medicine) => (
              <li key={medicine.id}>
                <strong>{medicine.Medicine.medicine_name}</strong> -{" "}
                {medicine.Medicine.company_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#333",
    textAlign: "center",
  },
  section: {
    marginBottom: "20px",
  },
  subheading: {
    color: "#555",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
    borderRadius: "20px",
    marginLeft: "30px",
    padding: "5px 20px",
    borderColor: "gray",
  },
};

export default Prescription;
