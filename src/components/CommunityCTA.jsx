import { FaPenNib, FaUsers } from "react-icons/fa";
import { Link } from "react-router";

const CommunityCTA = () => {
    return (
        <section className="bg-base-200 py-12 px-4">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-8">
                {/* Text Content */}
                <div className="space-y-5 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-primary">
                        Be a Part of the Knowledge Movement
                    </h2>
                    <p className="text-base-content text-lg">
                        Share your insights, help others grow, and build your
                        presence in our thriving knowledge-sharing community.
                        Whether you're a beginner or an expert - your voice
                        matters!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link to="/post-article">
                            <button className="btn btn-primary gap-2">
                                <FaPenNib />
                                Write an Article
                            </button>
                        </Link>
                        <Link to="/auth/register">
                            <button className="btn btn-outline btn-secondary gap-2">
                                <FaUsers />
                                Join the Community
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Illustration */}
                <div className="flex justify-center">
                    <img
                        src="https://illustrations.popsy.co/blue/studying.svg"
                        alt="Join community"
                        className="w-full max-w-md"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default CommunityCTA;
