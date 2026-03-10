import { Link, Outlet } from "react-router";
import { Instagram, Linkedin, Mail } from "lucide-react";

const imgImage2 = "/logo.png";

export function Layout() {
  return (
    <div className="bg-[#f3f6ff] min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#072c3c] shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Business Name */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={imgImage2}
                alt="WEND logo"
                className="h-12 w-14 object-cover"
              />
              <span className="font-['Arimo:Regular',sans-serif] text-xl text-white tracking-wide">
                WENDbysakshifatnani
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="font-['Arimo:Regular',sans-serif] text-white hover:text-[#99a1af] transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/portfolio"
                className="font-['Arimo:Regular',sans-serif] text-white hover:text-[#99a1af] transition-colors duration-200 relative group"
              >
                Portfolio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/projects"
                className="font-['Arimo:Regular',sans-serif] text-white hover:text-[#99a1af] transition-colors duration-200 relative group"
              >
                Projects
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/services"
                className="font-['Arimo:Regular',sans-serif] text-white hover:text-[#99a1af] transition-colors duration-200 relative group"
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/about"
                className="font-['Arimo:Regular',sans-serif] text-white hover:text-[#99a1af] transition-colors duration-200 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/contact"
                className="bg-white text-[#072c3c] px-6 py-2 rounded hover:bg-[#f3f6ff] transition-all duration-300 shadow-md hover:shadow-lg font-['Arimo:Regular',sans-serif]"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <Outlet />

      <footer className="bg-[#061f2b] py-14">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 gap-10 text-white md:grid-cols-4">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <img
                  src={imgImage2}
                  alt="WEND logo"
                  className="h-12 w-14 object-cover"
                />
                <span className="font-['Arimo:Regular',sans-serif] text-2xl tracking-widest">
                  WENDbysakshifatnani
                </span>
              </div>
              <p className="font-['Arimo:Regular',sans-serif] text-sm text-white/75">
                Crafting premium interiors with clarity, character, and timeless design.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-['Arimo:Regular',sans-serif] text-lg">Navigation</h4>
              <div className="space-y-2 font-['Arimo:Regular',sans-serif] text-sm text-white/80">
                <Link to="/" className="transition-colors hover:text-white">Home</Link>
                <br />
                <Link to="/services" className="transition-colors hover:text-white">Services</Link>
                <br />
                <Link to="/projects" className="transition-colors hover:text-white">Projects</Link>
                <br />
                <Link to="/contact" className="transition-colors hover:text-white">Contact</Link>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-['Arimo:Regular',sans-serif] text-lg">Contact</h4>
              <div className="space-y-2 font-['Arimo:Regular',sans-serif] text-sm text-white/80">
                <p>wendbysakshifatnani@gmail.com</p>
                <p>+91 8767-915-715</p>
                <p>Cloud Office</p>
                <p>Malegaon, Nashik</p>
                <p>Maharashtra- 423203</p>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-['Arimo:Regular',sans-serif] text-lg">Follow</h4>
              <div className="flex items-center gap-4 text-white/85">
                <a href="#" aria-label="Instagram" className="transition-colors hover:text-white">
                  <Instagram className="size-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-white">
                  <Linkedin className="size-5" />
                </a>
                <a href="mailto:studio@wenddesign.com" aria-label="Email" className="transition-colors hover:text-white">
                  <Mail className="size-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/15 pt-6 text-center font-['Arimo:Regular',sans-serif] text-sm text-white/65">
            © 2026 WEND. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}