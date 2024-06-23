import { useEffect } from "react";
import styled from "styled-components";

const Contact = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, []);

  return (
    <Wrapper>
      <h2 className="common-heading">Contact Page</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.083463235326!2d72.95113447939238!3d21.268163548922267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dedbfffffff%3A0xe2683f850017f1be!2sIIIT%20Surat!5e0!3m2!1sen!2sin!4v1709654488656!5m2!1sen!2sin"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/mdoqdoaq"
            method="POST"
            className="contact-inputs"
          >
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              autoComplete="off"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              autoComplete="off"
            />
            <textarea
              name="message"
              placeholder="Enter your message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
            ></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
