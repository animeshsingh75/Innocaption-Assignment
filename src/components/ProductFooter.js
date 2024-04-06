import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faYoutube,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./style/ProductFooter.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-item-icon">
        <FontAwesomeIcon icon={faFacebookF} className="footer-icons" />
        <FontAwesomeIcon icon={faYoutube} className="footer-icons" />
        <FontAwesomeIcon icon={faInstagram} className="footer-icons" />
        <FontAwesomeIcon icon={faTwitter} className="footer-icons" />
      </div>
      <div className="footer-item">
        <p>ABOUT US</p>
        <p>CONTACT US</p>
        <p>FAQS</p>
        <p>ORDER STATUS</p>
        <p>ORDERS & RETURNS</p>
        <p>SHIPPING INFORMATION</p>
      </div>
      <div className="footer-item">
        <input
          type="email"
          placeholder="Enter your email"
          className="footer-email"
        />
        <button className="btn btn-primary mt-2">Subscribe</button>
        <small className="small-text">
          By subscribing you confirm that you have read and agree to our privacy
          policy
        </small>
      </div>
    </footer>
  );
};

export default Footer;
