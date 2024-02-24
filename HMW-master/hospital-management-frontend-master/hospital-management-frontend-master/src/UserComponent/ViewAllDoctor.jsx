import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllDoctor = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [allDoctor, setAllDoctor] = useState([]);
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  useEffect(() => {
    const getAllDoctor = async () => {
      const allDoctor = await retrieveAllDoctor();
      if (allDoctor) {
        setAllDoctor(allDoctor);
      }
    };

    getAllDoctor();
  }, []);

  const retrieveAllDoctor = async () => {
    const response = await axios.get(
      `${baseUrl}/api/users/doctor/all`
    );
    console.log(response.data);
    return response.data;
  };

  const deleteDoctor = async (doctorId) => {
    const response = await axios.delete(
      `${baseUrl}/api/users/delete/id?userId=${doctorId}`
    );
    console.log(response.data);
    const allDoctor = await retrieveAllDoctor();
    if (allDoctor) {
      setAllDoctor(allDoctor);
    }
  };
  if (!admin) {
    return <h1>Only Admin can view this Page</h1>;
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
          <h2>All Doctor</h2>
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
                  <th scope="col">Doctor</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Specialist</th>
                  <th scope="col">Experience</th>
                  <th scope="col">Age</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allDoctor.map((doctor) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={doctor.doctorImage}
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{doctor.firstName}</b>
                      </td>

                      <td>
                        <b>{doctor.lastName}</b>
                      </td>
                      <td>
                        <b>{doctor.emailId}</b>
                      </td>
                      <td>
                        <b>{doctor.specialist}</b>
                      </td>
                      <td>
                        <b>{doctor.experience}</b>
                      </td>
                      <td>
                        <b>{doctor.age}</b>
                      </td>
                      <td>
                        <b>{doctor.contact}</b>
                      </td>

                      <td>
                        <b>
                          {doctor.street +
                            " " +
                            doctor.city +
                            " " +
                            doctor.pincode}
                        </b>
                      </td>
                      <td>
                        <button
                          className="btn bg-color custom-bg-text btn-sm"
                          onClick={() => deleteDoctor(doctor.id)}
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

export default ViewAllDoctor;
