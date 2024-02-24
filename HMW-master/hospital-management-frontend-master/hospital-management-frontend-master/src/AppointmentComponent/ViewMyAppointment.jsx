import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ViewMyAppointment = () => {
  const { appointmentId } = useParams();
  let navigate = useNavigate();
  const [allAppointments, setAllAppointments] = useState([]);

  const patient = JSON.parse(sessionStorage.getItem("active-patient"));

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
    const response = await axios.get(
      "http://localhost:5000/api/appointments/patient/id?patientId=" +
        appointmentId
    );

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

    console.log("We are having this newArray: ", finalData);
    console.log("We are having this responseData: ", response.data);
    console.log(finalData.length);

    // Return the processed data (finalData) instead of the original data from the API
    return finalData;
  };

  const cancelAppointment = (appointmentId) => {
    console.log(appointmentId);
    console.log("ghittinh api ** ");
    //corrected
    fetch("http://localhost:3000/api/appointments/patient/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointmentId: appointmentId,
        status: "Cancel",
      }),
    }).then((result) => {
      console.log(result);
      result.json().then((res) => {
        console.log(res);
        navigate("/patient/appointments");
        console.log(res);
        toast.success(res, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    });

    window.location.reload(true);
  };

  if (!patient) {
    return (
      <h1>
        Please first Login as patient to see your appointments
        ViewAllAppointment
      </h1>
    );
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
                  <th scope="col">Prescription</th>
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
                    .padStart(2, "0")}:${originalDate
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
                        <b>{a.token}</b>
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
                        <Link to={`/patient/prescription/${a.id}`}>
                          <b className="text-color">See Prescription</b>
                        </Link>
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
                        <b> {a.waitingTime}</b>
                      </td>
                      <td>
                        {(() => {
                          if (a.status === "Not Assigned to Doctor") {
                            return (
                              <button
                                onClick={() => cancelAppointment(a.id)}
                                className="btn btn-sm bg-color custom-bg-text"
                              >
                                Cancel
                              </button>
                            );
                          }
                        })()}
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

export default ViewMyAppointment;
