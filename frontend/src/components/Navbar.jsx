import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md text-white z-50 shadow-md">
      
      <div className="w-full px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <h1 className="text-4xl font-bold text-white">
          Sanjay.dev
        </h1>

        {/* NAV LINKS */}
        <div className="flex gap-6 text-sm md:text-base">
          
          <a href="#about" className="hover:text-green-400 border-b-2 border-transparent hover:border-green-400 transition">
            About
          </a>

          <a href="#skills" className="hover:text-green-400 border-b-2 border-transparent hover:border-green-400 transition">
            Skills
          </a>

          <a href="#projects" className="hover:text-green-400 border-b-2 border-transparent hover:border-green-400 transition">
            Projects
          </a>

          <Link to="/blog" className="hover:text-green-400 border-b-2 border-transparent hover:border-green-400 transition">
            Blog
          </Link>

          <Link to="/contact" className="hover:text-green-400 border-b-2 border-transparent hover:border-green-400 transition">
            Contact
          </Link>
          </div>
      </div>
    </nav>
  );
}