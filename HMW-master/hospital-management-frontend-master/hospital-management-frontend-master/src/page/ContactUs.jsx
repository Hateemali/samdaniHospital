import React from "react";
import styled from "styled-components";
import Footer from "./Footer";

const ContactUs = () => {
  const Wrapper = styled.section`
    padding: 3rem 0 5rem 0;
    background-size: cover;
    background-color: #ffffff;
    background-position: center;
    color: #00000; /* Black */
    text-align: center;
    position: relative;
  `;

  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #F8F8FF;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;

    h2 {
      font-size: 2rem;
      color: #000;
    }

    p {
      color: #555;
    }
  `;

  const ContactFormContainer = styled.div`
    flex: 1;
    text-align: left;

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: bold; /* Add this line to make headings bold */
      color: #000; /* Black text */
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;
      border: 2px solid #000; /* Added black border */
      border-radius: 4px;
      font-size: 16px;
    }

    input[type="submit"] {
      cursor: pointer;
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      color: #FFF;
      background-color: #1C1C1C;
      transition: all 0.2s;

      &:hover {
        background-color: #FF0000;
      }
    }
  `;

  const GoogleMapsContainer = styled.div`
    flex: 1;
    height: 400px;
    border: 1px solid black;

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  `;

  const AddressContainer = styled.div`
    flex-basis: 100%;
    text-align: center;
    background-color:  #1C1C1C;
    padding: 2rem;
    

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    p {
      font-size: 1.2rem;
      color: #fff;
    }
  `;

  return (
    <>
    <Wrapper>
      <Container>
        <ContactFormContainer>
          <h2>Contact Us</h2>
          <p>If you have any queries, contact us:</p>
          <form action="https://formspree.io/f/xgedgjkr" method="POST">
            <h3>Name</h3>
            <input type="text" name="name" placeholder="Your Name" autoComplete="off" required />
            <h3>Phone</h3>
            <input type="tel" name="phone" placeholder="Your Phone Number" autoComplete="off" required />
            <h3>Email</h3>
            <input type="email" name="email" placeholder="Your Email" autoComplete="off" required />
            <h3>Write Your Message</h3>
            <textarea name="message" rows="6" placeholder="Write your message" autoComplete="off" required />
            <input type="submit" value="Send Your Message" />
          </form>
        </ContactFormContainer>

        <GoogleMapsContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3063003658945!2d67.0883751!3d24.9216333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f341ce80dbd%3A0xc664cd4a6cdbd155!2sSamdani%20Hospital!5e0!3m2!1sen!2s!4v1690540149380!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </GoogleMapsContainer>

        <AddressContainer>
          <h3>Our Address</h3>
          <p>A 560 block Street No 5, Block 5 Gulshan-e-Iqbal, Karachi, Karachi City, Sindh.</p>
          <h3>Write Us</h3>
          <p>info@samdanihospital.com</p>
          <h3>Call Us</h3>
          <p>(021) 34815413</p>
        </AddressContainer>
      </Container>
    </Wrapper>
    <Footer />
    </>
  );
};

export default ContactUs;