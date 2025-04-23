import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link , useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const navigate = useNavigate()

  return (
    <nav className="w-full px-4 py-3 shadow-md bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800">
        Travel Package Booking
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4">
          <Link to="/" className="text-gray-700 mt-2 hover:text-black">
            Home
          </Link>
          <Link to="/profile" className="text-gray-700 mt-2 hover:text-black">
            Profile
          </Link>
          <Button onClick={()=>navigate("/login")}  variant="outline" className="ml-4">
            Login
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Links */}
      {open && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          <Link to="/" className="block text-gray-700">
            Home
          </Link>
          <Link to="/profile" className="block text-gray-700">
            Profile
          </Link>
          <Button onClick={()=>navigate("/login")} variant="outline" className="w-full">
            Login
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
