import React from "react";
import styled from "styled-components";
import {
  FaMedkit,
  FaBalanceScale,
  FaLightbulb,
  FaHandshake,
} from "react-icons/fa";

const ValuesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px; /* Adjust the max-width as needed */
  margin: 0 auto;
  padding: 10px;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 10px;
  color: #00000;
`;

const ValueCard = styled.div`
  flex: 1; /* Set each card to occupy equal space */
  text-align: center;
  padding: 50px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 10px;
  margin: 10px;
`;

const SubHeading = styled.h3`
  font-size: 20px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const HeadingIcon = styled.span`
  margin-right: 10px;
`;

const HeadingText = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.5;
  min-width: 90px;
  margin-top: 10px;
  margin-bottom: 2px;
  /* Add any other custom styling properties you want */
`;

const OurValues = () => {
  return (
    <div>
      <Heading>Our Values</Heading>
      <ValuesContainer>
        <ValueCard>
          <SubHeading>
            <HeadingIcon>
              <FaMedkit size={30} color="#FF0000" />
            </HeadingIcon>
            Quality
          </SubHeading>
          <HeadingText>
            Our patients always come first in everything we do. We are
            determined to provide our patients with accurate and quality
            service, timely, and consistently. We aim to achieve this by team
            dedication towards Diagnostic excellence.
          </HeadingText>
        </ValueCard>
        <ValueCard>
          <SubHeading>
            <HeadingIcon>
              <FaBalanceScale size={30} color="#FF0000" />
            </HeadingIcon>
            Integrity
          </SubHeading>
          <HeadingText>
            Our patients always come first in everything we do. We are
            determined to provide our patients with accurate and quality
            service, timely, and consistently. We aim to achieve this by team
            dedication towards Diagnostic excellence.
          </HeadingText>
        </ValueCard>
        <ValueCard>
          <SubHeading>
            <HeadingIcon>
              <FaLightbulb size={30} color="#FF0000" />
            </HeadingIcon>
            Innovation
          </SubHeading>
          <HeadingText>
            We are relentlessly seeking innovative ways and methods to enhance
            patient care and provide a valuable experience to our customers.
            Through dedication and sheer hard work, we have maintained our
            competitive edge.
          </HeadingText>
        </ValueCard>
        <ValueCard>
          <SubHeading>
            <HeadingIcon>
              <FaHandshake size={30} color="#FF0000" />
            </HeadingIcon>
            Responsibility
          </SubHeading>
          <HeadingText>
            As a company and as individuals, we accept full responsibility for
            our performance and acknowledge our accountability for the ultimate
            outcome of all that we do. We strive for continuous improvement,
            believing that competence, reliability, and rigorous adherence to
            process discipline are the keys to excellence.
          </HeadingText>
        </ValueCard>
      </ValuesContainer>
    </div>
  );
};

export default OurValues;
