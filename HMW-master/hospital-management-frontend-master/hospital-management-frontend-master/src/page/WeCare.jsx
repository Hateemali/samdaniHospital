import React from "react";
import styled from "styled-components";
import we from "../images/we.png";

const ImageContainer = styled.div``;

const WeCare = () => {
  return (
    <ImageContainer>
      <img style={{ width: "100vw", height: "100%" }} src={we} alt="" />
    </ImageContainer>
  );
};

export default WeCare;
