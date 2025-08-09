import { motion } from "framer-motion";
import { FaLightbulb, FaRocket, FaUsers } from "react-icons/fa";
import { Link } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-center space-y-6"
        >
          <h1 className="text-5xl font-bold text-primary">About ThinkUP</h1>
          <p className="text-lg text-base-content/80 max-w-3xl mx-auto">
            Empowering minds through shared knowledge. Learn. Grow. Think Up!
          </p>
        </motion.header>

        {/* Intro */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="mt-12 text-center max-w-4xl mx-auto space-y-4"
        >
          <p className="text-lg leading-relaxed">
            <strong>ThinkUP</strong> is your platform to contribute your
            expertise and discover valuable insights across{" "}
            <span className="font-semibold">
              Technology, Science, Arts, and more
            </span>
            .
          </p>
          <p className="text-lg leading-relaxed">
            Whether you're a beginner seeking to learn or an expert ready to
            share, your voice matters here. We believe in creating a space where
            knowledge flows freely and helps everyone grow.
          </p>
        </motion.section>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: <FaLightbulb />,
              title: "Share Your Knowledge",
              desc: "Contribute articles, tips, and insights to help others grow and learn from your experience.",
            },
            {
              icon: <FaUsers />,
              title: "Community Driven",
              desc: "Connect with learners, creators, and innovators in a thriving knowledge-sharing community.",
            },
            {
              icon: <FaRocket />,
              title: "Grow Your Presence",
              desc: "Build your profile, showcase your expertise, and inspire others while learning new things.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 2}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="text-primary text-5xl mb-4">{item.icon}</div>
                <h3 className="card-title">{item.title}</h3>
                <p className="text-base-content/80">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
          className="mt-20 p-10 rounded-2xl bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Be a Part of the Knowledge Movement
          </h2>
          <p className="max-w-3xl mx-auto text-lg mb-6">
            Share your insights, help others grow, and join us in making
            knowledge accessible to everyone. Whether you're just starting or
            already an expert, your journey matters.
          </p>
          <Link to="/auth/register">
            <button className="btn gap-2">
              <FaUsers />
              Join the Community
            </button>
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
