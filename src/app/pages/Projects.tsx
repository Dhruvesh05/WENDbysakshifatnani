import React from "react";
import { motion } from "motion/react";

const imgImageModernInteriorDesign = "/1.png";
const imgImageMinimalistLivingRoom = "/2.png";
const imgImageLuxuryKitchen = "/4.png";
const imgImageContemporaryBedroom = "/3.png";
const imgImageModernDiningRoom = "/5.png";
const imgImageStylishBathroom = "/6.png";

export default function Projects() {
  const [filter, setFilter] = React.useState<string>("All");

  const featuredProjects = [
    {
      img: imgImageModernInteriorDesign,
      title: "Luxury Villa Renovation",
      category: "Residential",
      description: "A complete transformation of a 4,500 sq ft villa featuring open-concept living spaces, custom millwork, and a sophisticated blend of modern and traditional elements. The project showcases premium materials and meticulous attention to detail.",
      duration: "8 months",
      area: "4,500 sq ft",
      location: "Mumbai, Maharashtra",
      features: ["Custom Millwork", "Smart Home Integration", "Sustainable Materials", "Open Floor Plan"]
    },
    {
      img: imgImageMinimalistLivingRoom,
      title: "Contemporary Office Space",
      category: "Commercial",
      description: "Modern office design emphasizing collaboration and productivity. Features include flexible workstations, acoustic solutions, biophilic design elements, and technology-integrated meeting spaces for a dynamic work environment.",
      duration: "6 months",
      area: "3,200 sq ft",
      location: "Pune, Maharashtra",
      features: ["Flexible Workstations", "Acoustic Solutions", "Biophilic Design", "Tech-Integrated Spaces"]
    },
    {
      img: imgImageLuxuryKitchen,
      title: "Boutique Hotel Suite",
      category: "Hospitality",
      description: "Luxurious suite design that creates a memorable guest experience. Featuring custom furniture, curated art pieces, premium textiles, and ambient lighting designed to provide comfort and elegance.",
      duration: "4 months",
      area: "800 sq ft",
      location: "Nashik, Maharashtra",
      features: ["Custom Furniture", "Curated Artwork", "Premium Textiles", "Ambient Lighting"]
    },
    {
      img: imgImageContemporaryBedroom,
      title: "Urban Apartment Redesign",
      category: "Residential",
      description: "Complete renovation of a city apartment maximizing space and light. Features include modular furniture, hidden storage solutions, and a cohesive color palette that creates flow throughout the space.",
      duration: "5 months",
      area: "1,200 sq ft",
      location: "Mumbai, Maharashtra",
      features: ["Space Optimization", "Hidden Storage", "Modular Furniture", "Natural Light Enhancement"]
    },
    {
      img: imgImageModernDiningRoom,
      title: "Restaurant Interior",
      category: "Commercial",
      description: "Sophisticated dining space that balances ambiance with functionality. Custom lighting, acoustic treatments, and carefully selected materials create an inviting atmosphere for guests.",
      duration: "7 months",
      area: "2,800 sq ft",
      location: "Nashik, Maharashtra",
      features: ["Custom Lighting", "Acoustic Design", "Open Kitchen Concept", "Bar Design"]
    },
    {
      img: imgImageStylishBathroom,
      title: "Spa-Inspired Bathroom",
      category: "Residential",
      description: "Tranquil bathroom retreat featuring natural materials, statement fixtures, and thoughtful lighting. The design creates a serene spa-like environment for daily relaxation.",
      duration: "3 months",
      area: "350 sq ft",
      location: "Pune, Maharashtra",
      features: ["Natural Stone", "Rainfall Shower", "Heated Floors", "Custom Vanity"]
    }
  ];

  // compute filtered list based on current filter
  const filteredProjects = React.useMemo(() => {
    if (filter === "All") return featuredProjects;
    return featuredProjects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen">
      {/* Projects Header */}
      <section className="bg-[#072c3c] py-20">
        <div className="container mx-auto px-8 text-center">
          <motion.h1
            className="font-['Arimo:Regular',sans-serif] text-6xl text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Featured Projects
          </motion.h1>
          <motion.p
            className="font-['Arimo:Regular',sans-serif] text-xl text-[#99a1af] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforming visions into reality through thoughtful design, innovative solutions, and exceptional craftsmanship
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white py-8 border-b border-[#d1d5dc]">
        <div className="container mx-auto px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              "All",
              "Residential",
              "Commercial",
              "Hospitality",
            ].map((tab) => (
              <motion.button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-['Arimo:Regular',sans-serif] ${
                  filter === tab
                    ? "bg-[#072c3c] text-white"
                    : "bg-[#f3f6ff] text-[#072c3c] hover:bg-[#072c3c] hover:text-white"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="space-y-24">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {/* Image */}
                <motion.div
                  className={`relative group ${
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-2xl">
                    <motion.img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-[500px] object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-[#072c3c] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className={`space-y-6 ${
                    index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <span className="bg-[#072c3c] text-white px-4 py-1 rounded text-sm">
                      {project.category}
                    </span>
                    <span className="text-[#4a5565] text-sm">
                      {project.location}
                    </span>
                  </motion.div>

                  <motion.h2
                    className="font-['Arimo:Regular',sans-serif] text-4xl text-[#0a0a0a]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {project.title}
                  </motion.h2>

                  <motion.p
                    className="font-['Arimo:Regular',sans-serif] text-lg text-[#4a5565] leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Project Details */}
                  <motion.div
                    className="grid grid-cols-2 gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <motion.div
                      className="bg-[#f9fafb] p-4 rounded"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-['Arimo:Regular',sans-serif] text-[#072c3c] block text-sm mb-1">
                        Duration
                      </span>
                      <span className="font-['Arimo:Regular',sans-serif] text-[#0a0a0a] text-lg">
                        {project.duration}
                      </span>
                    </motion.div>
                    <motion.div
                      className="bg-[#f9fafb] p-4 rounded"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-['Arimo:Regular',sans-serif] text-[#072c3c] block text-sm mb-1">
                        Area
                      </span>
                      <span className="font-['Arimo:Regular',sans-serif] text-[#0a0a0a] text-lg">
                        {project.area}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <h3 className="font-['Arimo:Regular',sans-serif] text-[#072c3c] mb-3">
                      Key Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, i) => (
                        <motion.span
                          key={i}
                          className="bg-white border border-[#d1d5dc] px-3 py-1 rounded-full text-sm text-[#4a5565]"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                          whileHover={{ scale: 1.1, backgroundColor: "#072c3c", color: "#ffffff" }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Process
            </h2>
            <p className="font-['Arimo:Regular',sans-serif] text-xl text-[#4a5565]">
              A collaborative approach from concept to completion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your vision, needs, and lifestyle"
              },
              {
                step: "02",
                title: "Design",
                description: "Creating concepts that bring your vision to life"
              },
              {
                step: "03",
                title: "Development",
                description: "Refining details and selecting materials"
              },
              {
                step: "04",
                title: "Delivery",
                description: "Executing the design with precision and care"
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="text-5xl font-['Arimo:Regular',sans-serif] text-[#072c3c] opacity-20 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.2 }}
                >
                  {phase.step}
                </motion.div>
                <h3 className="font-['Arimo:Regular',sans-serif] text-2xl text-[#0a0a0a] mb-3">
                  {phase.title}
                </h3>
                <p className="font-['Arimo:Regular',sans-serif] text-[#4a5565]">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}