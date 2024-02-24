import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    navigate("/home");
    window.location.reload(true);
  };

  return (
    <ul class="navbar-nav ms-2 mb-0 mb-lg-0 me-1">
      <li className="nav-item">
        <Link
          to="/user/patient/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">View Patients</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="user/doctor/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">View Doctors</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="admin/appointments/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Check All Appointments</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/patient/appointmentadmin/take"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Take Apppointements</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/user/patient/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Patient</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/user/doctor/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Doctor</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={adminLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
