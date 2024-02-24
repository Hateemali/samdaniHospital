import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const DoctorHeader = () => {
  let navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const storedUserDataString = sessionStorage.getItem("active-doctor");
    const storedUserData = JSON.parse(storedUserDataString);

    let data = { userId: storedUserData.id, available: false };
    fetch(`${baseUrl}/api/users/doctor/updateAvailability`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log("Doctor status has been changed to true ", result);
    });
    sessionStorage.removeItem("active-doctor");

    navigate("/home");
    window.location.reload(true);
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="doctor/appointment/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">View My Appointments</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default DoctorHeader;
