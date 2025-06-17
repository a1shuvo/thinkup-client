import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import logo from "/logo.png";

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content">
            <div className="px-4 py-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start">
                    <Link to="/">
                        <img
                            className="w-30 md:w-36"
                            src={logo}
                            alt="ThinkUp Logo"
                        />
                    </Link>
                    <p className="text-sm mt-2 max-w-xs">
                        Empowering minds through shared knowledge. Learn. Grow.
                        Think Up!
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-col items-center md:items-start">
                    <span className="footer-title">Links</span>
                    <Link to="/about" className="link link-hover">
                        About Us
                    </Link>
                    <Link to="/contact" className="link link-hover">
                        Contact Us
                    </Link>
                    <Link to="/terms" className="link link-hover">
                        Terms & Conditions
                    </Link>
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-center md:items-start">
                    <span className="footer-title">Follow Us</span>
                    <div className="flex gap-4 text-xl mt-2">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer footer-center p-4 bg-base-200 text-base-content">
                <p>
                    © {new Date().getFullYear()} ThinkUp. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
