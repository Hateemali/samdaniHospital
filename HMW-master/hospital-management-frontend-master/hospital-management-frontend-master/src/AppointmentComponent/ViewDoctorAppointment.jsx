import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const ViewDoctorAppointment = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [allAppointments, setAllAppointments] = useState([]);

  const doctor = JSON.parse(sessionStorage.getItem("active-doctor"));
  console.log(doctor);
  useEffect(() => {
    const getAllAppointments = async () => {
      const allAppointments = await retrieveAllAppointments();
      if (allAppointments) {
        setAllAppointments(allAppointments);
      }
    };

    getAllAppointments();
  }, []);

  const retrieveAllAppointments = async () => {
    //corrected
    const response = await axios.get(
      `${baseUrl}/api/appointments/doctor/id?doctorId=${doctor.id}`
    );
    console.log(response.data);
    return response.data;
  };

  if (!doctor) {
    return <h1>Only Doctor can see this page</h1>;
  }

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Appointments</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Token</th>
                  <th scope="col">Patient Name</th>
                  <th scope="col">Patient Contact</th>
                  <th scope="col">Problem</th>
                  <th scope="col">Doctor Name</th>

                  <th scope="col">Appointment Take Date</th>
                  <th scope="col">Appointment Date</th>
                  <th scope="col">Appointment Status</th>
                  <th scope="col">Appointment Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allAppointments.map((a) => {
                                    const originalDate = new Date(a.date);
                                    const hoursO = originalDate.getHours();
                                    const ampmO = hoursO >= 12 ? "pm" : "am";
                                    const formattedHoursO = hoursO % 12 === 0 ? 12 : hoursO % 12;
                                    const formattedDateTime = `${originalDate.getFullYear()}-${(
                                      originalDate.getMonth() + 1
                                    )
                                      .toString()
                                      .padStart(2, "0")}-${originalDate
                                      .getDate()
                                      .toString()
                                      .padStart(2, "0")} ${originalDate
                                      .getHours()
                                      .toString()
                                      .padStart(2, "00")
                                    }:${originalDate
                                      .getMinutes()
                                      .toString()} ${ampmO}`;
                                    const appointmentDate = new Date(a.appointmentDate);
                                    const hours = appointmentDate.getHours();
                                    const ampm = hours >= 12 ? "pm" : "am";
                                    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
                                    const appointmentDateTime = `${appointmentDate.getFullYear()}-${(
                                      appointmentDate.getMonth() + 1
                                    )
                                      .toString()
                                      .padStart(2, "0")}-${appointmentDate
                                      .getDate()
                                      .toString()
                                      .padStart(2, "0")} ${formattedHours
                                      .toString()
                                      .padStart(2, "0")}:${appointmentDate
                                      .getMinutes()
                                      .toString()
                  
                                      .padStart(2, "0")} ${ampm}`;
                  
                                    const paragraph = a.problem;
                                    const words = paragraph.split(" ");
                                    const problem = words.slice(0, 3).join(" ");
                  return (
                    <tr>
                      <td>
                        <b>{a.id}</b>
                      </td>

                      <td>
                        <b>{a.patient.firstName + " " + a.patient.lastName}</b>
                      </td>

                      <td>
                        <b>{a.patient.email}</b>
                      </td>
                      <td>
                        <b>{a.problem}</b>
                      </td>
                      <td>
                        <b>{a.doctor.firstName + " " + a.doctor.lastName}</b>
                      </td>

                      <td>
                        <b>{formattedDateTime}</b>
                      </td>
                      <td>
                        <b>{appointmentDateTime}</b>
                      </td>
                      <td>
                        <b>{a.status}</b>
                      </td>
                      <td>
                        <b>{a.price}</b>
                      </td>
                      <td>
                        <Link
                          to={`/doctor/appointment/update/${a.id}`}
                          className="nav-link active btn btn-sm"
                          aria-current="page"
                        >
                          <b className="text-color">Update Appointment</b>
                        </Link>
                        <Link to={`/doctor/prescription/${a.id}`}>
                          <b className="text-color">See Prescription</b>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctorAppointment;
