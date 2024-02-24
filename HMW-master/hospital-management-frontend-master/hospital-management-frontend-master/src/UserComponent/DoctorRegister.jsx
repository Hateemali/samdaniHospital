import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Form } from "react-router-dom";

const DoctorRegister = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
    specialist: "",
    experience: "",
  });
  const [urlPath, setUrlPath] = useState("");
  const [imgPath, setImgPath] = useState("");
  user.role = "doctor";

  const [selectedImage, setSelectedImage] = useState(null);

  console.log("ROLE FECTHED : " + user.role);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [genders, setGenders] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  const retrieveAllGenders = async () => {
    const response = ["male", "female"];
    return response;
  };

  const retrieveAllSpecialist = async () => {
    const response = await axios.get(
      `${baseUrl}/api/users/doctor/specialist/all`
    );
    return response.data;
  };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };

    const getAllSpecialist = async () => {
      const allSpecialist = await retrieveAllSpecialist();
      if (allSpecialist) {
        setSpecialists(allSpecialist);
      }
    };

    getAllGenders();
    getAllSpecialist();
  }, []);

  const saveUser = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("emailId", user.emailId);
    formData.append("password", user.password);
    formData.append("contact", user.contact);
    formData.append("street", user.street);
    formData.append("city", user.city);
    formData.append("pincode", user.pincode);
    formData.append("role", user.role);
    formData.append("age", user.age);
    formData.append("gender", user.sex);
    formData.append("specialist", user.specialist);
    formData.append("experience", user.experience);

    async function registerUser(dict) {
      navigate("/");
      window.location.reload(false);
      console.log("The dict is here: ", dict);
    }

    //corrected need to place image

    await axios
      .post(`${baseUrl}/api/users/doctor/upload`, formData)
      .then((result) => {
        console.log("Here is the result  ", result.data.link);
        setUrlPath(result.data.link);
        console.log("URL IMAGE PATH IS HERE >>>>", urlPath);
        const tempdict = {
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          password: user.password,
          contact: user.contact,
          street: user.street,
          city: user.city,
          pincode: user.pincode,
          role: user.role,
          age: user.age,
          gender: user.sex,
          specialist: user.specialist,
          experience: user.experience,
          imagePath: result.data.link,
        };
        axios
          .post(`${baseUrl}/api/users/doctor/register`, tempdict)
          .then((result) => {
            result.json().then((res) => {
              console.log(res);
              toast.success("Doctor Registered Successfully!!!", {
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
        registerUser(tempdict);
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Register {user.role}</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={saveUser}>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b> First Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={user.firstName}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleUserInput}
                  value={user.lastName}
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <b>
                  <label className="form-label">Email Id</label>
                </b>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="quantity" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password}
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="sex" className="form-label">
                  <b>User Gender</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="sex"
                >
                  <option value="0">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="bloodGroup" className="form-label">
                  <b>Specialization</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="specialist"
                >
                  <option value="">Select Specialization</option>
                  <option value="Child Specialist">Child Specialist</option>
                  <option value="Bones Specialist">Bones Specialist</option>
                  <option value="Chest Specialist">Chest Specialist</option>
                  <option value="ENT Specialist">ENT Specialist</option>
                  <option value="General Physician">General Physician</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Contact No</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="contact"
                  name="contact"
                  onChange={handleUserInput}
                  value={user.contact}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Age</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  onChange={handleUserInput}
                  value={user.age}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Experience</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="experience"
                  name="experience"
                  onChange={handleUserInput}
                  value={user.experience}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Street</b>
                </label>
                <textarea
                  className="form-control"
                  id="street"
                  name="street"
                  rows="3"
                  onChange={handleUserInput}
                  value={user.street}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="price" className="form-label">
                  <b>City</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  onChange={handleUserInput}
                  value={user.city}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="pincode" className="form-label">
                  <b>Pincode</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  onChange={handleUserInput}
                  value={user.pincode}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="image3" className="form-label">
                  <b> Select Doctor Image</b>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Register Doctor"
                />
              </div>

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;
