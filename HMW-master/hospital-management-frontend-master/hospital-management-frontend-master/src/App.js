import "./App.css";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./page/AboutUs";
import ContactUs from "./page/ContactUs";
import WeCare from "./page/WeCare";
import HomeService from "./page/HomeService";

import OurServices from "./page/OurServices";
import Header from "./NavbarComponent/Header";
import HomePage from "./page/HomePage";

import UserRegister from "./UserComponent/UserRegister";
import UserLoginForm from "./UserComponent/UserLoginForm";
import AddAppointment from "./AppointmentComponent/AddAppointment";
import AddAdminAppointment from "./AppointmentComponent/AddAdminAppointment";
import ViewMyAppointment from "./AppointmentComponent/ViewMyAppointment";
import ViewAllAppointment from "./AppointmentComponent/ViewAllAppointment";
import AssignAppointment from "./AppointmentComponent/AssignAppointment";
import ViewAllDoctor from "./UserComponent/ViewAllDoctor";
import ViewAllPatient from "./UserComponent/ViewAllPatient";
import ViewDoctorAppointment from "./AppointmentComponent/ViewDoctorAppointment";
import TreatAppointment from "./AppointmentComponent/TreatAppointment";
import DoctorRegister from "./UserComponent/DoctorRegister";
import LoginContext from "./page/LoginContext";
import Prescription from "./UserComponent/Prescription";
import AddMedicine from "./page/AddMedicine";

function App() {
  return (
    <LoginContext>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/all/hotel/location" element={<HomePage />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="Services" element={<OurServices />} />
          <Route path="HomeService" element={<HomeService />} />
          <Route path="WeCare" element={<WeCare />} />

          <Route path="user/doctor/register" element={<DoctorRegister />} />
          <Route path="user/patient/register" element={<UserRegister />} />
          <Route path="user/admin/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLoginForm />} />
          <Route
            path="/patient/appointment/take"
            element={<AddAppointment />}
          />
          <Route
            path="/patient/appointmentadmin/take"
            element={<AddAdminAppointment />}
          />
          <Route
            path="/patient/appointments/:appointmentId"
            element={<ViewMyAppointment />}
          />
          <Route path="/user/doctor/all" element={<ViewAllDoctor />} />
          <Route path="/user/patient/all" element={<ViewAllPatient />} />

          <Route
            path="/doctor/appointment/all"
            element={<ViewDoctorAppointment />}
          />
          <Route
            path="/doctor/prescription/:appointmentId"
            element={<Prescription />}
          />
          <Route
            path="/patient/prescription/:appointmentId"
            element={<Prescription />}
          />
          <Route
            path="/admin/appointments/all"
            element={<ViewAllAppointment />}
          />
          <Route
            path="/admin/appointment/:appointmentId/assign"
            element={<AssignAppointment />}
          />
          <Route
            path="/doctor/appointment/update/:appointmentId"
            element={<TreatAppointment />}
          />
          <Route path="/admin/addMedicine" element={<AddMedicine />} />
        </Routes>
      </div>
    </LoginContext>
  );
}

export default App;
