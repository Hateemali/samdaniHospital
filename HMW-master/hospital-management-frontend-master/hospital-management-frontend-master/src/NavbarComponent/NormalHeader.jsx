import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled components
const NavList = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

const NavItem = styled.li`
  list-style: none;
  margin-right: 1.5rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000; /* Black text color */
  font-weight: bold;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f44336; /* Light reddish text color on hover */
  }
`;

const NormalHeader = () => {
  return (
    <NavList>
      <NavItem>
        <NavLink
          to="/user/patient/register"
          className="nav-link active"
          aria-current="page"
        >
          <b>Register Patient</b>
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          to="/user/login"
          className="nav-link active"
          aria-current="page"
        >
          <b>Login</b>
        </NavLink>
      </NavItem>
    </NavList>
  );
};

export default NormalHeader;
