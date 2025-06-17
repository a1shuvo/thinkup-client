import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Link } from "react-router";
import animationData from "../assets/hero.json";

const HeroBanner = () => {
    return (
        <div className="bg-base-100 py-4">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
                {/* Lottie Animation */}
                <motion.div
                    className="flex-1"
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Lottie
                        animationData={animationData}
                        loop
                        autoplay
                        className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto"
                    />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    className="flex-1 text-center lg:text-left space-y-6"
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-primary">
                        Share Your Knowledge
                    </h1>

                    <p className="text-lg md:text-xl text-base-content">
                        A platform to contribute your expertise and discover
                        valuable insights across Technology, Science, Arts, and
                        more...
                    </p>

                    <motion.div
                        className="mt-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/articles">
                            <button className="btn btn-primary rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                Explore Articles
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroBanner;
