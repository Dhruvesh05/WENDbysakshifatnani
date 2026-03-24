import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/svg-x7swsbypsk";
import { submitContactForm } from "../lib/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await submitContactForm({
        name: name.trim(),
        email: email.trim(),
        service,
        message: message.trim(),
      });

      setName("");
      setEmail("");
      setService("");
      setMessage("");
      if (result.warning) {
        setSuccessMessage(`Thanks for reaching out. ${result.warning}`);
      } else {
        setSuccessMessage("Thanks for reaching out. We will contact you shortly.");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-[#072c3c] py-20">
        <div className="container mx-auto px-8 text-center">
          <motion.h1
            className="font-['Arimo:Regular',sans-serif] text-6xl text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="font-['Arimo:Regular',sans-serif] text-xl text-[#99a1af] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We'd love to hear about your project and help make your vision a reality.
          </motion.p>
        </div>
      </section>

      {/* Contact Section (copied from Home) */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Arimo:Regular',sans-serif] text-5xl text-[#0a0a0a] mb-4">
              Get In Touch
            </h2>
            <p className="font-['Arimo:Regular',sans-serif] text-xl text-[#4a5565]">
              Let's create something beautiful together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info only */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24">
                    <path
                      d={svgPaths.p9c60400}
                      stroke="#0A0A0A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d={svgPaths.p2bf8f980}
                      stroke="#0A0A0A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-['Arimo:Regular',sans-serif] text-xl text-[#0a0a0a] mb-2">
                    Email
                  </h3>
                  <p className="font-['Arimo:Regular',sans-serif] text-[#4a5565]">
                    wendbysakshifatnani@gmail.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24">
                    <path
                      d={svgPaths.p3a2d4980}
                      stroke="#0A0A0A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-['Arimo:Regular',sans-serif] text-xl text-[#0a0a0a] mb-2">
                    Phone
                  </h3>
                  <p className="font-['Arimo:Regular',sans-serif] text-[#4a5565]">
                    +91 8767-915-715
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24">
                    <path
                      d={svgPaths.p27c543b0}
                      stroke="#0A0A0A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d={svgPaths.p2d59bff0}
                      stroke="#0A0A0A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-['Arimo:Regular',sans-serif] text-xl text-[#0a0a0a] mb-2">
                    Cloud Office
                  </h3>
                  <p className="font-['Arimo:Regular',sans-serif] text-[#4a5565]">
                    Malegaon, Nashik<br />Maharashtra- 423203
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block font-['Arimo:Regular',sans-serif] text-[#0a0a0a] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#d1d5dc] rounded focus:outline-none focus:ring-2 focus:ring-[#072c3c] transition-all duration-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-['Arimo:Regular',sans-serif] text-[#0a0a0a] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#d1d5dc] rounded focus:outline-none focus:ring-2 focus:ring-[#072c3c] transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block font-['Arimo:Regular',sans-serif] text-[#0a0a0a] mb-2">
                  Service Interested In
                </label>
                <select
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#d1d5dc] rounded focus:outline-none focus:ring-2 focus:ring-[#072c3c] transition-all duration-200 bg-white"
                >
                  <option value="">Select a service</option>
                  <option value="residential">Residential Design</option>
                  <option value="commercial">Commercial Spaces</option>
                  <option value="planning">Space Planning</option>
                  <option value="consultation">Styling & Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-['Arimo:Regular',sans-serif] text-[#0a0a0a] mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#d1d5dc] rounded focus:outline-none focus:ring-2 focus:ring-[#072c3c] transition-all duration-200 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              {successMessage ? (
                <p className="rounded bg-green-50 px-3 py-2 text-sm text-green-700">{successMessage}</p>
              ) : null}
              {errorMessage ? (
                <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
              ) : null}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#072c3c] text-white py-4 rounded hover:bg-[#0a3d52] transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
