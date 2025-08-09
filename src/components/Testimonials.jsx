import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const testimonialsData = [
  {
    id: 1,
    quote:
      "ThinkUp helped me boost my productivity and learn new skills quickly. Highly recommend!",
    name: "Sophia Johnson",
    role: "Product Manager",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    quote:
      "The community and content are top-notch. I found amazing contributors who helped me grow.",
    name: "James Carter",
    role: "Software Engineer",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    quote:
      "A premium experience with insightful articles and expert advice. ThinkUp is my go-to platform.",
    name: "Emily Davis",
    role: "UX Designer",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  // Add more testimonials if needed...
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const Testimonials = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const testimonialIndex =
    ((page % testimonialsData.length) + testimonialsData.length) %
    testimonialsData.length;
  const testimonial = testimonialsData[testimonialIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
        What Our Users Say
      </h2>

      {/* Desktop: 3 card grid */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-8">
        {testimonialsData.map(({ id, quote, name, role, photo }) => (
          <div
            key={id}
            className="card bg-base-100 shadow-xl rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
          >
            <p className="italic text-accent mb-6 text-lg">{`"${quote}"`}</p>
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={photo} alt={name} />
                </div>
              </div>
              <div>
                <p className="font-semibold text-primary">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: swipe carousel */}
      <div className="md:hidden relative mt-8">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={testimonial.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction < 0 ? 100 : -100, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="card bg-base-100 shadow-xl rounded-lg p-6 flex flex-col justify-between cursor-grab select-none"
          >
            <p className="italic text-gray-700 mb-6 text-lg">{`"${testimonial.quote}"`}</p>
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={testimonial.photo} alt={testimonial.name} />
                </div>
              </div>
              <div>
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 gap-3">
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              className={`btn btn-xs rounded-full p-0 ${
                i === testimonialIndex ? "btn-primary" : "btn-outline"
              }`}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setPage([i, i > testimonialIndex ? 1 : -1])}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
