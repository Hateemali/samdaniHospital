import React from 'react';
import styled from 'styled-components';
import Faisal from "../images/Faisal.png";
import Footer from "./Footer"; 
const Wrapper = styled.div`
  max-width: 100%;
  min-height: 30vh; /* Set the minimum height to cover the full screen */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Add space between the background section and content section */
`;

const ContentSection = styled.div`
  flex: 1; /* Take the remaining height of the screen */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px; /* Add margin to create space between content and footer */
  margin-bottom: 30px; /* Add margin to create space between content and footer */
`;



const Heading = styled.h2`
  font-size: 50px;
  margin-top: 20px; /* Adjust the margin as needed */
  margin-bottom: 30px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow for a 3D effect */
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.6;
  text-align: justify;
  margin: 20px;
  max-width: 800px; /* Set a maximum width for the paragraph */
  margin-bottom: 70px;

`;

const AboutUs = () => {
  return (
    <>
      <Wrapper>
        
        <ContentSection>
          <Heading>Message From The Director</Heading>
          <Image src={Faisal} alt="Chairman" />
          <Paragraph>
            We dedicate our resources to support our doctors and all our employees in their daily tasks, helping them reach their potential and develop and maintain service excellence at the highest level. Additionally, we have long understood that our healthcare skills, know-how, and resources should be put at the service of the community. As such, we continue to develop new programs that cover primary and secondary prevention in all pathologies and disciplines. We believe that by ensuring better healthcare services for present and future generations, we contribute to building a brighter world together.
          </Paragraph>
          <Heading>Our Vision</Heading>
          <Paragraph>
            We aim to be the most trusted laboratory partner, providing state-of-the-art medical diagnostic solutions that empower patients and doctors with timely and accurate medical treatment, and most importantly, to improve the quality of life.
          </Paragraph>
        </ContentSection>
        <Footer /> {/* Display the Footer component at the end of the AboutUs page */}
      </Wrapper>
    </>
  );
};

export default AboutUs;
