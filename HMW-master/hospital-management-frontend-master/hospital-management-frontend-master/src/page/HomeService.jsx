import React from "react";
import styled from "styled-components";
import ourservice from "../images/ourservice.png";

const ImageContainer = styled.div``;

const HomeService = () => {
  return (
    <ImageContainer>
      <img
        style={{ width: "100vw", height: "100%" }}
        src={ourservice}
        alt="Our Services"
      />
    </ImageContainer>
  );
};

export default HomeService;
