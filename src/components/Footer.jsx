import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content">
            <div className="footer px-4 py-10 flex justify-between max-w-7xl mx-auto">
                {/* Brand */}
                <div>
                    <Link to="/" className="text-2xl font-bold text-primary">
                        ThinkUp
                    </Link>
                    <p className="text-sm mt-2 max-w-xs">
                        Empowering minds through shared knowledge. Learn. Grow.
                        Think Up!
                    </p>
                </div>

                {/* Navigation */}
                <div>
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

                {/* Social */}
                <div>
                    <span className="footer-title">Follow Us</span>
                    <div className="flex space-x-4 text-xl">
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
