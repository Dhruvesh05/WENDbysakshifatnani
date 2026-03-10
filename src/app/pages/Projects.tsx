import React from "react";
import { motion } from "motion/react";

const imageModules = import.meta.glob("../../assets/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const imageEntries = Object.entries(imageModules).sort(([firstPath], [secondPath]) =>
  firstPath.localeCompare(secondPath),
);

function pickImage(folderName: string, fallbackIndex = 0) {
  const matching = imageEntries.filter(([path]) => path.includes(`/${folderName}/`));

  if (matching.length > 0) {
    return matching[Math.min(fallbackIndex, matching.length - 1)][1];
  }

  return imageEntries[fallbackIndex]?.[1] ?? "";
}

export default function Projects() {
  const [filter, setFilter] = React.useState<string>("All");

  const featuredProjects = [
    {
      img: pickImage("Bedrooms", 2),
      title: "Private Residence Suite",
      category: "Residential",
      description: "A calm and layered bedroom program designed around comfort, integrated lighting, and tailored storage that enhances day-to-day living.",
      duration: "5 months",
      area: "2,000 sq ft",
      location: "Mumbai, Maharashtra",
      features: ["Layered Lighting", "Bespoke Wardrobes", "Soft Acoustics", "Material Harmony"],
    },
    {
      img: pickImage("Living Room", 1),
      title: "Urban Family Living",
      category: "Residential",
      description: "An open living zone that connects lounge and conversation areas with warm textures, contemporary lines, and high visual continuity.",
      duration: "4 months",
      area: "1,600 sq ft",
      location: "Nashik, Maharashtra",
      features: ["Open Layout", "Statement Ceiling", "Natural Textures", "Custom Joinery"],
    },
    {
      img: pickImage("Kitchen & dining", 0),
      title: "Kitchen and Dining Redesign",
      category: "Residential",
      description: "A practical and elegant kitchen-dining transformation with focused workflow planning, durable finishes, and layered ambient lighting.",
      duration: "3 months",
      area: "950 sq ft",
      location: "Pune, Maharashtra",
      features: ["Workflow Planning", "Durable Surfaces", "Ambient Lighting", "Integrated Storage"],
    },
    {
      img: pickImage("Lobby", 0),
      title: "Corporate Lobby Experience",
      category: "Commercial",
      description: "A high-impact reception and waiting experience built with clean geometry, directional lighting, and premium materials to strengthen first impressions.",
      duration: "6 months",
      area: "3,400 sq ft",
      location: "Pune, Maharashtra",
      features: ["Reception Identity", "Directional Lighting", "Premium Surfaces", "Visitor Flow"],
    },
    {
      img: pickImage("Cafe", 1),
      title: "Cafe Interior Experience",
      category: "Hospitality",
      description: "A compact hospitality space designed for high turnover and memorable ambience with curated textures, flexible seating, and warm branding cues.",
      duration: "4 months",
      area: "1,100 sq ft",
      location: "Nashik, Maharashtra",
      features: ["Flexible Seating", "Lighting Layers", "Brand-led Palette", "Service Efficiency"],
    },
    {
      img: pickImage("Pilate studio- Alcore", 2),
      title: "Pilates Studio at Alcore",
      category: "Wellness",
      description: "A movement-focused studio with clear circulation, calming tones, and spatial rhythm that supports both private and group training sessions.",
      duration: "5 months",
      area: "2,300 sq ft",
      location: "Mumbai, Maharashtra",
      features: ["Studio Zoning", "Calming Palette", "Training Flexibility", "Clean Detailing"],
    },
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
              "Wellness",
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