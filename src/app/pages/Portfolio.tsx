import { motion } from "motion/react";

const imgImageModernInteriorDesign = "/1.png";
const imgImageMinimalistLivingRoom = "/2.png";
const imgImageContemporaryBedroom = "/3.png";
const imgImageLuxuryKitchen = "/4.png";
const imgImageModernDiningRoom = "/5.png";
const imgImageStylishBathroom = "/6.png";

export default function Portfolio() {
  const portfolioItems = [
    { img: imgImageModernInteriorDesign, title: "Modern Living Space", category: "Residential", description: "Contemporary design with clean lines and natural light" },
    { img: imgImageMinimalistLivingRoom, title: "Minimalist Living Room", category: "Residential", description: "Simple elegance with functional spaces" },
    { img: imgImageContemporaryBedroom, title: "Contemporary Bedroom", category: "Residential", description: "Serene retreat with modern comfort" },
    { img: imgImageLuxuryKitchen, title: "Luxury Kitchen", category: "Residential", description: "Gourmet cooking space with premium finishes" },
    { img: imgImageModernDiningRoom, title: "Modern Dining Room", category: "Residential", description: "Sophisticated gathering space" },
    { img: imgImageStylishBathroom, title: "Stylish Bathroom", category: "Residential", description: "Spa-like ambiance with contemporary fixtures" },
    { img: imgImageModernInteriorDesign, title: "Executive Office", category: "Commercial", description: "Professional workspace with modern aesthetic" },
    { img: imgImageMinimalistLivingRoom, title: "Retail Space", category: "Commercial", description: "Inviting environment for customer engagement" },
    { img: imgImageContemporaryBedroom, title: "Hotel Suite", category: "Hospitality", description: "Luxurious accommodation with attention to detail" }
  ];


  return (
    <div className="min-h-screen">
      {/* Portfolio Header */}
      <section className="bg-[#072c3c] py-20">
        <div className="container mx-auto px-8 text-center">
          <motion.h1
            className="font-['Arimo:Regular',sans-serif] text-6xl text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Portfolio
          </motion.h1>
          <motion.p
            className="font-['Arimo:Regular',sans-serif] text-xl text-[#99a1af] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our collection of thoughtfully designed spaces that blend functionality with aesthetic excellence
          </motion.p>
        </div>
      </section>


      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((project, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative overflow-hidden h-80">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072c3c]/90 via-[#072c3c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-['Arimo:Regular',sans-serif] text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-['Arimo:Regular',sans-serif] text-xl text-[#0a0a0a]">
                      {project.title}
                    </h3>
                    <span className="bg-[#072c3c] text-white px-3 py-1 rounded text-xs">
                      {project.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}