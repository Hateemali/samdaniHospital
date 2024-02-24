import React from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import logo from '../images/LOGO.png';
import RoleNav from './RoleNav';

// Theme
const theme = {
  primaryColor: '#f0000', // Red color
  secondaryColor: 'Black', // White color
};

// Styled components
const CustomNav = styled.nav`
  background-color: ${props => props.theme.primaryColor};
`;




const LogoImage = styled.img`
  width: 100px; /* Increase or decrease the width as needed */
  height: 100px; /* Increase or decrease the height as needed */
  display: inline-block;
  vertical-align: middle;
  margin-right: 50px; /* Adjust the margin as needed */
  margin-left: 300px; /* Adjust the margin as needed to move the logo to the right */
  border-radius: 50%; /* Apply circular border radius to create a circular logo */
  box-shadow: 100 100 5px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow for a 3D effect */
`;


const BrandLink = styled(Link)`
  i {
    font-style: italic;
  }
`;

const NavigationItem = styled.li`
  margin-right: 0px;
`;

const NavigationLink = styled(Link)`
  color: ${props => props.theme.secondaryColor};
  text-decoration: none;
  display: inline-block;
  padding: 10px;
  border-radius: 50px;
  
  &:hover {
    background-color: red; /* Remove the background color on hover */
  }
`;



const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <CustomNav className="navbar navbar-expand-lg text-color">
        <div className="container-fluid text-color">
          <LogoImage src={logo} alt="Logo" />
          <BrandLink to="/" className="navbar-brand">
            <i>
              <b>Samdani Hospital</b>
            </i>
          </BrandLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavigationItem>
                <NavigationLink to="/about">About Us</NavigationLink>
              </NavigationItem>

              <NavigationItem>
                <NavigationLink to="/contact">Contact Us</NavigationLink>
              </NavigationItem>
              
              <NavigationItem>
                <NavigationLink to="/Services">Our Services</NavigationLink>
              </NavigationItem>
            </ul>

            <RoleNav />
          </div>
        </div>
      </CustomNav>
    </ThemeProvider>
  );
};

export default Header;
