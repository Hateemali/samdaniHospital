import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const ViewAllAppointment = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [allAppointments, setAllAppointments] = useState([]);
  const [waitingTime, setWaitingTime] = useState([]);
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
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
      `${baseUrl}/api/appointments/all`
    );
    console.log(response.data,'ali');
    function convertDate(appointmentDate) {
      const finalDate = `${appointmentDate.getFullYear()}-${(
        appointmentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${appointmentDate
        .getDate()
        .toString()
        .padStart(2, "0")} ${appointmentDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${appointmentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${appointmentDate
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      return finalDate;
    }

    async function waitingTime(arr) {
      const promises = arr.map(async (dict) => {
        const appointmentTime = new Date(dict.date);
        const checkinTime = new Date(); // Assuming checkinTime is the current time

        // Check if appointmentTime and checkinTime have the same date (same day)
        if (
          appointmentTime.getFullYear() === checkinTime.getFullYear() &&
          appointmentTime.getMonth() === checkinTime.getMonth() &&
          checkinTime < appointmentTime &&
          appointmentTime.getDate() === checkinTime.getDate()
        ) {
          const waitingTimeInMilliseconds = checkinTime - appointmentTime;

          // Convert waiting time to minutes and seconds
          const waitingTimeInMinutes = Math.floor(
            waitingTimeInMilliseconds / (1000 * 60)
          );

          const newData = {
            Appointment_Time: convertDate(appointmentTime),
            Checkin_Time: convertDate(checkinTime),
          };

          try {
            const res = await axios.post(
              "http://127.0.0.1:5001/get_waiting_time",
              newData
            );
            console.log("response data", res.data.estimated_waiting_time);
            const totalMinutes = res.data.estimated_waiting_time;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = Math.floor(totalMinutes % 60);
            const finalStr = `${hours} h and ${minutes} min`;

            dict["waitingTime"] = finalStr;
          } catch (error) {
            console.error("Error fetching waiting time:", error);
            dict["waitingTime"] = "--"; // Set waiting time to '--' in case of an error
          }
        } else {
          dict["waitingTime"] = "--"; // Set waiting time to '--' if dates are different
        }

        return dict;
      });

      const results = await Promise.all(promises);
      return results;
    }

    const finalData = await waitingTime(response.data);
    return finalData;
  };

  const estimatedTime = async () => {};

  if (!admin) {
    return <h1>Only admin can see this page</h1>;
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

                  <th scope="col">Problem</th>
                  <th scope="col">Doctor Name</th>

                  <th scope="col">Appointment Take Date</th>
                  <th scope="col">Appointment Date</th>
                  <th scope="col">Appointment Status</th>
                  <th scope="col">Appointment Price</th>
                  <th scope="col">Estimated Time</th>
                </tr>
              </thead>
              <tbody>
                {allAppointments.map((a) => {
                  const originalDate = new Date(a.date);
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
                    .padStart(2, "0")}:${originalDate
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}:${originalDate
                    .getSeconds()
                    .toString()
                    .padStart(2, "0")}`;
                  const appointmentDate = new Date(a.appointmentDate);
                  const appointmentDateTime = `${appointmentDate.getFullYear()}-${(
                    appointmentDate.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}-${appointmentDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")} ${appointmentDate
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${appointmentDate
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}:${appointmentDate
                    .getSeconds()
                    .toString()
                    .padStart(2, "0")}`;

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
                        <b>{problem}...</b>
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
                      <td>{a.waitingTime}</td>
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

export default ViewAllAppointment;
