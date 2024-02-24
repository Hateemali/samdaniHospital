import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useParams, useNavigate } from "react-router-dom";

const AddAdminAppointment = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  //   console.log("Here is the patient please look", patient);
  const [appointment, setAppointment] = useState({
    patientId: "",
    problem: "",
    date: "",
    doctorId: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/api/users/doctor/all`)
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/api/users/patient/all`)
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const handleUserInput = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };
  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    const hours = "09"; // Minimum hour
    const minutes = "00"; // Minimum minutes
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const saveAppointment = async (event) => {
    event.preventDefault();

    // Ensure that the necessary fields are filled
    if (!appointment.date || !appointment.doctorId || !appointment.problem) {
      toast.error("Please fill in all the required fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Add additional data to the appointment state before sending the request
    // setAppointment({
    //   ...appointment,
    //   patientId: patient.id,
    // });
    console.log("Starting fetching ");

    await fetch(`${baseUrl}/api/appointments/patient/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    }).then((result) => {
      console.log("run ", result);
      toast.success("Appointment Added Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      result
        .json()
        .then((res) => {
          console.log("response", res);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    navigate(`/`);
  };
  if (!admin) {
    return <h1>Only admin can see this page</h1>;
  }

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Take Appointment</h5>
          </div>
          <div className="card-body">
            <form onSubmit={saveAppointment}>
              <div className="mb-3 text-color">
                <label htmlFor="problem" className="form-label">
                  <b>Problem</b>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="problem"
                  name="problem"
                  onChange={handleUserInput}
                  value={appointment.problem}
                  placeholder="Mention your problems here..."
                />
              </div>
              <div className="mb-3 text-color">
                <label htmlFor="date" className="form-label">
                  <b>Appointment Date</b>
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="date"
                  name="date"
                  onChange={handleUserInput}
                  min={getMinDateTime()}
                  value={appointment.date}
                />
              </div>
              <div className="mb-3 text-color">
                <label htmlFor="doctorId" className="form-label">
                  <b>Select Patient</b>
                </label>
                <select
                  id="patientId"
                  name="patientId"
                  className="form-control"
                  onChange={handleUserInput}
                  value={appointment.patientId}
                >
                  <option value="">Select a Patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 text-color">
                <label htmlFor="doctorId" className="form-label">
                  <b>Select Doctor</b>
                </label>
                <select
                  id="doctorId"
                  name="doctorId"
                  className="form-control"
                  onChange={handleUserInput}
                  value={appointment.doctorId}
                >
                  <option value="">Select a Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="submit"
                className="btn bg-color custom-bg-text"
                value="Take Appointment"
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdminAppointment;
