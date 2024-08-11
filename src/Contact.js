import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Contact = () => {

  const { isAuthenticated, user } = useAuth0();

  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (
    <Wrapper>
      <h2 className="common-heading">Contact page</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57055.53969490111!2d77.57408250134989!3d26.649403551209975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973e1c9a4ea2137%3A0x91f121c1c1d274c2!2z4KSs4KS-4KSw4KWALCDgpLDgpL7gpJzgpLjgpY3gpKXgpL7gpKggMzI4MDIx!5e0!3m2!1shi!2sin!4v1713008826359!5m2!1shi!2sin"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/xdoqpbgr" method="POST" className="contact-inputs">
            <input type="text" name="username" placeholder="username" required autoComplete="off" value={isAuthenticated? user.name : ""} />
            <input type="email" name="Email" placeholder="Email" required  autoComplete="off" value={isAuthenticated? user.email : ""} />
            <textarea name="message" placeholder="Enter your message" cols="30" rows="10" autoComplete="off" ></textarea>
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
