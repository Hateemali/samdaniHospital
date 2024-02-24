import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import Select from "react-select";

function TreatAppointment() {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [prescription, setPrescription] = useState("");
  const [prescriptionData, setPrescriptionData] = useState(null);
  const { appointmentId } = useParams();
  const prescriptionRef = useRef(null);

  useEffect(() => {
    console.log("useEffect runninngggg..");
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

  useEffect(() => {
    const fetchMedicineOptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/medicine/search?searchTerm=${searchTerm}`
        );
        const data = response.data;
        // Assuming your API returns an array of medicine objects with 'id' and 'name'
        const options = data.matchingMedicines.map((medicine) => ({
          value: medicine.id,
          label: medicine.medicine_name,
        }));
        setMedicineOptions(options);
      } catch (error) {
        console.error("Error fetching medicine options:", error);
        // Handle error
      }
    };

    fetchMedicineOptions();
  }, [searchTerm]);

  const handleMedicineChange = (selectedOptions) => {
    setSelectedMedicines(selectedOptions);
  };

  if (!prescriptionData) {
    return <p>Loading...</p>;
  }

  const saveAppointment = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("appointmentId", appointmentId);
    formData.append("price", price);
    formData.append("prescription", prescription);
    formData.append("status", status);

    // Append selected medicines to formData
    const medicineIds = selectedMedicines.map((medicine) => medicine.value);
    console.log(medicineIds);
    formData.append("medicines", JSON.stringify(medicineIds));
    const tempDict = {
      appointmentId: appointmentId,
      price: price,
      prescription: prescription,
      status: status,
      medicines: medicineIds,
    };
    console.log(tempDict);

    //corrected
    axios
      .post("http://localhost:5000/api/appointments/doctor/update", tempDict)
      .then((result) => {
        console.log(result);

        console.log(result.responseMessage);

        alert("Patient Appointment Status updated Successfully");
      });
    navigate("/");
  };

  return (
    <div>
      <div className="mb-6 mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Update Appointment</h5>
          </div>
          <div className="card-body text-color">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Patient Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    prescriptionData.patient.firstName +
                    " " +
                    prescriptionData.patient.lastName
                  }
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Problme Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="problem"
                  name="problem"
                  rows="3"
                  value={prescriptionData.problem}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Appointment Date</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={prescriptionData.appointmentDate}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label htmlFor="prescription" className="form-label">
                  <b>Prescription</b>
                </label>
                <textarea
                  className="form-control"
                  id="prescription"
                  name="prescription"
                  rows="3"
                  onChange={(e) => {
                    setPrescription(e.target.value);
                  }}
                  value={prescription}
                />
              </div>

              <div className="mb-3">
                <label>Select Medicines:</label>
                <Select
                  isMulti
                  options={medicineOptions}
                  value={selectedMedicines}
                  onChange={handleMedicineChange}
                  onInputChange={(inputValue) => setSearchTerm(inputValue)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  <b>Treatment Price</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Appointment Status</b>
                </label>
                <select
                  name="status"
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  className="form-control"
                >
                  <option value="">Select Appointment Status</option>
                  <option value="Treatment Done">Treatment Done</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={saveAppointment}
              >
                Update Appointment Status
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreatAppointment;
