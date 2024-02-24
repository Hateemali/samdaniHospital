import React from 'react';
import styled from 'styled-components';
import Orthopedic from "../images/2.jpg";
import xray from "../images/xray.png";
import skincare from "../images/skincare.png";
import Emergency from "../images/Emergency.png";
import Dental from "../images/Dental.png";
import  implants from "../images/implants.png";
import Lab from "../images/Lab.png";
import Med from "../images/Med.png";
import Footer from "./Footer";

// Styled components
const ServicesSection = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 50px;
  color: #00000;
`;

const ServiceList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
  
`;

const ServiceItem = styled.li`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ServiceImage = styled.img`
  width: 150px;
  height: 100px;
  margin-right: 20px;
  border-radius: 50%;
`;


const Services = () => {
  return (
    <>
      <ServicesSection>
        <Heading>Our Services</Heading>
        <ServiceList>
          <ServiceItem>
            <ServiceImage src={xray} alt="X-Rays Services" />
            <span>X-Rays Services</span>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={Orthopedic} alt="Orthopedic" />
            <span>Orthopedic</span>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={Lab} alt="Laboratory" />
            <span>Laboratory</span>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={Med} alt="Medicine & OPD" />
            <span>Medicine & OPD</span>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={skincare} alt="Skin Care" />
            <span>Skin Care</span>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={Emergency} alt="Emergency" />
            <span>Emergency</span>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={Dental} alt="Dental Services" />
            <span>Dental Services</span>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={implants} alt="Implants & More" />
            <span>Implants & More</span>
          </ServiceItem>
        </ServiceList>
        
      </ServicesSection>
      <Footer />
    
    </>

    
  );
};

export default Services;
