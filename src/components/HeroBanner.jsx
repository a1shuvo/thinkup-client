import { motion } from "framer-motion";
import { Link } from "react-router";

const HeroBanner = () => {
    return (
        <div className="bg-base-100 py-12">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
                <motion.div
                    className="flex-1"
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <img
                        src="https://img.freepik.com/premium-vector/college-project-concept-illustration_86047-867.jpg"
                        alt="Knowledge Sharing Illustration"
                        className="w-full max-w-md md:max-w-lg mx-auto"
                    />
                </motion.div>

                <motion.div
                    className="flex-1 text-center lg:text-left"
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">
                        Share Your Knowledge
                    </h1>

                    <p className="mt-6 text-base-content text-lg">
                        A platform to contribute your expertise and discover
                        valuable insights from others across various
                        fields—Technology, Science, Arts, and more.
                    </p>

                    <motion.div
                        className="mt-8"
                        whileHover={{ scale: 1.03}}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/articles">
                            <button className="btn btn-primary rounded-full px-6 text-lg">
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
