import { Link } from "react-router";
import { motion } from "motion/react";
import imgImageMinimalistLivingRoom from "@/assets/placeholder.svg";
import imgImageModernInteriorDesign from "@/assets/placeholder.svg";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* About Header */}
      <section className="bg-[#072c3c] py-20">
        <div className="container mx-auto px-8 text-center">
          <motion.h1
            className="font-['Arimo:Regular',sans-serif] text-6xl text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="font-['Arimo:Regular',sans-serif] text-xl text-[#99a1af] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Creating timeless spaces that inspire and elevate everyday living
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <motion.img
                  src={imgImageMinimalistLivingRoom}
                  alt="Interior design workspace"
                  className="w-full h-[600px] object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-[#072c3c] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2
                className="font-['Arimo:Regular',sans-serif] text-5xl text-[#0a0a0a]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our Story
              </motion.h2>
              <motion.p
                className="font-['Arimo:Regular',sans-serif] text-lg text-[#4a5565] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                WEND by Sakshi Fatnani was founded with a simple yet profound vision: to create 
                spaces that don't just look beautiful, but feel extraordinary. With a background 
                in architecture and a passion for material exploration, we've built a studio that 
                bridges the gap between aesthetic excellence and functional living.
              </motion.p>
              <motion.p
                className="font-['Arimo:Regular',sans-serif] text-lg text-[#4a5565] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Our approach combines timeless design principles with contemporary aesthetics, 
                ensuring every project stands the test of time while remaining relevant and inspiring. 
                We believe that great design is not just about following trends—it's about understanding 
                people, their stories, and creating environments that enhance their lives.
              </motion.p>
              <motion.p
                className="font-['Arimo:Regular',sans-serif] text-lg text-[#4a5565] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                From concept to completion, we're committed to excellence in every detail, 
                ensuring that each project reflects our dedication to quality, creativity, and client satisfaction.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#f9fafb] py-20">
        <div className="container mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Arimo:Regular',sans-serif] text-5xl text-[#0a0a0a] mb-4">
              Our Values
            </h2>
            <p className="font-['Arimo:Regular',sans-serif] text-xl text-[#4a5565]">
              The principles that guide every project we undertake
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Authenticity",
                description: "We create designs that are genuine reflections of our clients' personalities and lifestyles, not just trendy templates."
              },
              {
                title: "Quality",
                description: "From material selection to final execution, we never compromise on quality. Excellence is our standard."
              },
              {
                title: "Innovation",
                description: "We constantly explore new materials, techniques, and ideas to bring fresh perspectives to every project."
              },
              {
                title: "Collaboration",
                description: "Great design happens through partnership. We work closely with clients, craftsmen, and artisans to achieve the best results."
              },
              {
                title: "Sustainability",
                description: "We're committed to environmentally conscious design choices that minimize impact while maximizing longevity."
              },
              {
                title: "Attention to Detail",
                description: "Every element matters. We obsess over the details because they make the difference between good and exceptional."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-[#072c3c] text-white flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="size-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
                <h3 className="font-['Arimo:Regular',sans-serif] text-2xl text-[#0a0a0a] mb-3">
                  {value.title}
                </h3>
                <p className="font-['Arimo:Regular',sans-serif] text-[#4a5565] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="font-['Arimo:Regular',sans-serif] text-5xl text-[#0a0a0a]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Sakshi Fatnani
              </motion.h2>
              <motion.p
                className="font-['Arimo:Regular',sans-serif] text-xl text-[#072c3c] italic"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Founder & Principal Designer
              </motion.p>
              <motion.p
                className="font-['Arimo:Regular',sans-serif] text-lg text-[#4a5565] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                With a degree in architecture and years of experience in residential and commercial design, 
                Sakshi brings a unique perspective that blends technical expertise with artistic sensibility. 
                Her passion for material exploration and spatial storytelling has shaped WEND into a studio 
                known for creating spaces that resonate on both aesthetic and emotional levels.
              </motion.p>
              <motion.p
                className="font-['Arimo:Regular',sans-serif] text-lg text-[#4a5565] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                "Design is not just about making things look beautiful—it's about creating environments 
                that support and enhance the way people live, work, and connect with each other."
              </motion.p>
            </motion.div>

            <motion.div
              className="relative group order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <motion.img
                  src={imgImageModernInteriorDesign}
                  alt="Sakshi Fatnani"
                  className="w-full h-[600px] object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-[#072c3c] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}