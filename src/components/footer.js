import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="mb-4">Nitte Foodz</h5>
            <p>Discover amazing food and experiences near you.</p>
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-3">
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="list-inline-item me-3">
                <Link to="/Aboutus" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/ContactUs" className="text-light text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="mb-4">Contact</h5>
            <address className="mb-4">
              <strong>Nitte Foodz Inc.</strong><br />
              Nitte, Karkal<br />
              NMAMIT<br />
              <abbr title="Phone" className="text-light">P:</abbr> (123) 456-7690
            </address>
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-3">
                <a href="mailto:info@nittefoodz.com" className="text-light text-decoration-none">
                  nittefoodz@gmail.com
                </a>
              </li>
              <li className="list-inline-item">
                <a href="tel:+1234567690" className="text-light text-decoration-none">
                  Call Now
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="mb-4">Follow Us</h5>
            <ul className="list-inline social-icons">
              <li className="list-inline-item me-3">
                <a href="https://www.instagram.com/nittefoodz" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <FontAwesomeIcon icon={faInstagram} className="text-light fs-4" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.facebook.com/nittefoodz" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <FontAwesomeIcon icon={faFacebook} className="text-light fs-4" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4">Newsletter</h5>
            <p>Subscribe to our newsletter to get the latest updates.</p>
            <form>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Your Email" />
                <button className="btn btn-light" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container border-top pt-4">
        <div className="row">
          <div className="col-md-6">
            <small className="d-block mb-3">&copy; 2024 Nitte Foodz Inc.</small>
          </div>
          <div className="col-md-6 text-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-3">
                <Link to="/" className="text-light text-decoration-none">
                  Terms of Use
                </Link>
              </li>
              <li className="list-inline-item me-3">
                <Link to="/" className="text-light text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/" className="text-light text-decoration-none">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
