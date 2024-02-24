import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import DoctorCard from "../UserComponent/DoctorCard";
import Carousel from "./Carousel";
import OurValues from "./OurValues";
import WeCare from "./WeCare";
import HomeService from "./HomeService";

const HomePage = () => {
  const [allDoctor, setAllDoctor] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const retrieveAllDoctor = async () => {
    //corrected
    const response = await axios.get(
      `${baseUrl}/api/users/doctor/all`
    );
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const getAllDoctor = async () => {
      const allDoctor = await retrieveAllDoctor();
      if (allDoctor) {
        setAllDoctor(allDoctor);
      }
    };

    getAllDoctor();
  }, []);

  return (
    <div className="container-fluid mb-2">
      <Carousel />
      <div className="mt-2 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row row-cols-1 row-cols-md-5 g-3">
              {allDoctor.map((doctor) => {
                return <DoctorCard item={doctor} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <OurValues />
      <hr />
      <div>
        <HomeService />
      </div>
      <hr />
      <WeCare /> {/* Include the OurValues component here */}
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
