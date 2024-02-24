import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background-color: #f0f0f0; /* Light gray background color */
  padding: 30px;
`;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three equal columns */
  gap: 30px;
`;

const FooterColumn = styled.div``;

const FooterHeading = styled.h3`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: #ff0000; /* Red color for underline */
    position: absolute;
    bottom: -5px; /* Adjust the distance of the underline from the heading */
    left: 0;
  }
`;

const FooterParagraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const FooterLink = styled.a`
  color: #333;
  text-decoration: none;
  

  &:hover {
    text-decoration: underline;
    color: #f00000;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterColumn>
          <FooterHeading>Samdani Hospital</FooterHeading>
          <FooterParagraph>
            Samdani Hospital in Karachi, Pakistan, is a private, not-for-profit institution providing high-quality health care. The Main Hospitals serve as the principal sites for clinical training for the University's Medical Colleges and Schools of Nursing and Midwifery in Pakistan and East Africa.
          </FooterParagraph>
        </FooterColumn>
        <FooterColumn>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterList>
            <FooterListItem>
              <Icon icon={faPhoneAlt} />
              <FooterLink href="#contact">CONTACT: +92-308-2224444</FooterLink>
            </FooterListItem>
            
            <FooterListItem>
              <Icon icon={faEnvelope} />
              <FooterLink href="#webmail">WEBMAIL: info@samdanihospital.com</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterColumn>
        <FooterColumn>
          <FooterHeading>Get in touch</FooterHeading>
          <FooterParagraph>
            <FooterLink href="tel:+923082224444">
              <Icon icon={faWhatsapp} />
              Whatsapp: +92-308-2224444
            </FooterLink>
            <br />
            <FooterLink href="tel:+923082224444">
              <Icon icon={faPhoneAlt} />
              Gulshan: +92-308-2224444
            </FooterLink>
          </FooterParagraph>
          <FooterLink href="mailto:info@samdanihospital.com">
            <Icon icon={faEnvelope} />
            Mail: info@samdanihospital.com
          </FooterLink>
          <br />
          <FooterLink href="http://www.samdanihospital.com">
            <Icon icon={faGlobe} />
            Website: www.samdanihospital.com
          </FooterLink>
          <br />
          <FooterLink href="http://www.samdanihospital.com">
            <Icon icon={faMapMarkerAlt} />
            Headoffice: Block-2, Gulshan, Karachi-74700.
          </FooterLink>
        </FooterColumn>
      </FooterContainer>

      {/* Additional Footer Section */}
      <hr class="mb-4" />
      <section class="">
        <p class="d-flex justify-content-center align-items-center">
          <span class="me-3 text-color">Register for free</span>
          <Link to="/user/patient/register" class="active">
            <button
              type="button"
              class="btn btn-outline-light btn-rounded bg-color custom-bg-text"
            >
              Sign up!
            </button>
          </Link>
        </p>
      </section>
      <hr class="mb-4" />

      {/* Copyright */}
      <div class="text-center">
        © 2023 Copyright: SSUET FYP
      </div>
    </FooterWrapper>
  );
};

export default Footer;
