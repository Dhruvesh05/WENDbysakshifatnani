3 
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

const imgImageModernInteriorDesign = pickImage("Bedrooms", 1);
const imgImageMinimalistLivingRoom = pickImage("Lobby", 1);
const imgImageContemporaryBedroom = pickImage("Living Room", 3);
const imgImageLuxuryKitchen = pickImage("Kitchen & dining", 0);

export default function Services() {
  const services = [
    {
      title: "Residential Design",
      description: "Transform your living spaces into personalized havens that reflect your unique style and lifestyle. From concept to completion, we create homes that are both beautiful and functional.",
      features: [
        "Complete home renovations",
        "Room-by-room design",
        "Kitchen & bathroom redesign",
        "Custom furniture selection",
        "Color consultation",
        "Lighting design"
      ],
      image: imgImageModernInteriorDesign
    },
    {
      title: "Commercial Spaces",
      description: "Create inspiring work environments that enhance productivity and reflect your brand identity. We design offices, retail spaces, and hospitality venues that leave lasting impressions.",
      features: [
        "Office space planning",
        "Retail interior design",
        "Restaurant & cafe design",
        "Hotel & hospitality",
        "Brand integration",
        "Employee wellness focus"
      ],
      image: imgImageMinimalistLivingRoom
    },
    {
      title: "Space Planning",
      description: "Optimize your space for maximum functionality and flow. Our strategic space planning ensures every square foot works harder and smarter for your specific needs.",
      features: [
        "Layout optimization",
        "Traffic flow analysis",
        "Furniture placement",
        "Storage solutions",
        "Zoning strategies",
        "Accessibility planning"
      ],
      image: imgImageContemporaryBedroom
    },
    {
      title: "Styling & Consultation",
      description: "Expert guidance to bring your vision to life. Whether you need a complete design plan or styling advice, we provide the expertise to make informed decisions.",
      features: [
        "Design consultations",
        "Material selection",
        "Color schemes",
        "Accessory styling",
        "Art curation",
        "Final styling touches"
      ],
      image: imgImageLuxuryKitchen
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Services Header */}
      <section className="bg-[#072c3c] py-20">
        <div className="container mx-auto px-8 text-center">
          <motion.h1
            className="font-['Arimo:Regular',sans-serif] text-6xl text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="font-['Arimo:Regular',sans-serif] text-xl text-[#99a1af] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comprehensive design solutions tailored to your unique needs and aspirations
          </motion.p>
          </div>
        </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
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
                      src={service.image}
                      alt={service.title}
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
                  <motion.h2
                    className="font-['Arimo:Regular',sans-serif] text-5xl text-[#0a0a0a]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {service.title}
                  </motion.h2>

                  <motion.p
                    className="font-['Arimo:Regular',sans-serif] text-lg text-[#4a5565] leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Features List */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <h3 className="font-['Arimo:Regular',sans-serif] text-[#072c3c] text-lg mb-4">
                      What's Included:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }}
                        >
                          <svg
                            className="size-5 text-[#072c3c] mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-['Arimo:Regular',sans-serif] text-[#4a5565]">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
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
              How We Work
            </h2>
            <p className="font-['Arimo:Regular',sans-serif] text-xl text-[#4a5565]">
              A seamless journey from initial consultation to final reveal
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                description: "We start with a detailed conversation to understand your vision, needs, budget, and timeline. This helps us create a customized approach for your project."
              },
              {
                step: "02",
                title: "Concept Development",
                description: "Our team develops initial concepts, mood boards, and design directions based on your input. We present options and refine the direction together."
              },
              {
                step: "03",
                title: "Design & Planning",
                description: "Detailed design plans, 3D renderings, material selections, and comprehensive documentation are created. Every detail is considered and approved."
              },
              {
                step: "04",
                title: "Implementation",
                description: "We coordinate with contractors, oversee construction, manage procurement, and ensure quality at every stage of the project execution."
              },
              {
                step: "05",
                title: "Final Styling",
                description: "The finishing touches that bring the space to life. We style, accessorize, and perfect every detail before the final reveal."
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                className="flex gap-8 mb-12 last:mb-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-[#072c3c] text-white flex items-center justify-center font-['Arimo:Regular',sans-serif] text-xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {phase.step}
                  </motion.div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-['Arimo:Regular',sans-serif] text-2xl text-[#0a0a0a] mb-3">
                    {phase.title}
                  </h3>
                  <p className="font-['Arimo:Regular',sans-serif] text-[#4a5565] leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

