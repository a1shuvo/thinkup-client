import { motion } from "framer-motion";
import usePageTitle from "../hooks/usePageTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Terms = () => {
  usePageTitle("Terms & Conditions");
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-center mb-12"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Terms & Conditions
          </h1>
          <p className="text-base-content/80 mt-4 max-w-3xl mx-auto">
            Please read these Terms and Conditions carefully before using
            ThinkUP. By accessing or using our platform, you agree to be bound
            by these terms.
          </p>
        </motion.header>

        {/* Terms Sections */}
        <div className="space-y-10">
          {[
            {
              title: "1. Acceptance of Terms",
              content:
                "By registering, accessing, or using ThinkUP, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using the platform.",
            },
            {
              title: "2. User Responsibilities",
              content:
                "You are responsible for ensuring the accuracy and legality of the content you share. Do not post harmful, misleading, or offensive material.",
            },
            {
              title: "3. Intellectual Property",
              content:
                "All content on ThinkUP, unless otherwise stated, is owned by the platform or its contributors. Unauthorized use or reproduction is prohibited.",
            },
            {
              title: "4. Privacy Policy",
              content:
                "Your use of ThinkUP is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.",
            },
            {
              title: "5. Limitation of Liability",
              content:
                "ThinkUP is not liable for any direct, indirect, incidental, or consequential damages resulting from your use of the platform.",
            },
            {
              title: "6. Changes to the Terms",
              content:
                "We reserve the right to update these Terms & Conditions at any time. Continued use of ThinkUP after changes means you accept the revised terms.",
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
              className="bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-primary mb-2">
                {section.title}
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Last Updated */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={7}
          className="text-sm text-base-content/60 mt-12 text-center"
        >
          Last Updated: {new Date().toLocaleDateString()}
        </motion.p>
      </div>
    </div>
  );
};

export default Terms;
