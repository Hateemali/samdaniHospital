import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllPatient = () => {
  const [allPatient, setAllPatient] = useState([]);
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  useEffect(() => {
    const getAllPatient = async () => {
      const allPatient = await retrieveAllPatient();
      if (allPatient) {
        setAllPatient(allPatient);
      }
    };

    getAllPatient();
  }, []);

  const retrieveAllPatient = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/users/patient/all"
    );
    console.log(response.data);
    return response.data;
  };

  const deletePatient = async (patientId) => {
    console.log("running the api on id ", patientId);
    //"http://localhost:5000/api/user/delete/id?userId=" + patientId,
    const response = await axios.delete(
      "http://localhost:5000/api/users/delete/id?userId=" + patientId
    );
    console.log(response.data);
  };

  if (!admin) {
    return <h1>Only Admin can access this page</h1>;
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
          <h2>All Patients</h2>
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
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allPatient.map((patient) => {
                  return (
                    <tr>
                      <td>
                        <b>{patient.firstName}</b>
                      </td>

                      <td>
                        <b>{patient.lastName}</b>
                      </td>
                      <td>
                        <b>{patient.emailId}</b>
                      </td>
                      <td>
                        <b>{patient.age}</b>
                      </td>
                      <td>
                        <b>{patient.gender}</b>
                      </td>
                      <td>
                        <b>{patient.bloodGroup}</b>
                      </td>
                      <td>
                        <b>{patient.contact}</b>
                      </td>

                      <td>
                        <b>
                          {patient.street +
                            " " +
                            patient.city +
                            " " +
                            patient.pincode}
                        </b>
                      </td>
                      <td>
                        <button
                          className="btn bg-color custom-bg-text btn-sm"
                          onClick={() => deletePatient(patient.id)}
                        >
                          Delete
                        </button>
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

export default ViewAllPatient;
