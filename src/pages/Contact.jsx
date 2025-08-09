import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Contact = () => {
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold text-primary">Contact Us</h1>
          <p className="text-lg text-base-content/80 max-w-3xl mx-auto">
            Have questions or suggestions? We’d love to hear from you. Let’s
            connect and make ThinkUP even better together!
          </p>
        </motion.header>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: <FaEnvelope />,
              title: "Email",
              value: "support@thinkup.com",
            },
            {
              icon: <FaPhoneAlt />,
              title: "Phone",
              value: "+880 1234-567890",
            },
            {
              icon: <FaMapMarkerAlt />,
              title: "Location",
              value: "Dhaka, Bangladesh",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
              className="card bg-base-200 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="text-primary text-4xl mb-4">{item.icon}</div>
                <h3 className="card-title">{item.title}</h3>
                <p className="text-base-content/80">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={4}
          className="mt-20 flex justify-center"
        >
          <div className="card bg-base-200 shadow-lg p-8 w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-6 text-primary text-center">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  placeholder="Write your message..."
                  className="textarea textarea-bordered w-full"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
