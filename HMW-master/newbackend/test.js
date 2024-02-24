async function getEstimatedWaitingTime(appointmentTime, checkinTime) {
  const apiUrl = "http://127.0.0.1:5001/get_waiting_time"; // Update with the correct API URL

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Appointment_Time: appointmentTime,
        Checkin_Time: checkinTime,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData.estimated_waiting_time;
  } catch (error) {
    console.error("Error:", error);
    return null; // Or handle the error according to your requirements
  }
}

const appointmentTime = "2024-01-03 11:00:00";
const checkinTime = "2024-01-03 10:55:00";

getEstimatedWaitingTime(appointmentTime, checkinTime).then(
  (estimatedWaitingTime) => {
    console.log("Estimated Waiting Time:", estimatedWaitingTime);
  }
);
