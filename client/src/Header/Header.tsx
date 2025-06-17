import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo_Growly_SinFondo.png";
import logotext from "../assets/Nombre_Growly.png";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(() => {
    axios.get('http://localhost:8080/')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          //navigate('/login');
          
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);


  


	return (
		
    <header
      className="sticky top-0 z-50 w-full border-b shadow-sm"
      style={{ backgroundColor: "#2D6A4F", borderColor: "#1B4332" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo || "/placeholder.svg"} alt="Logo" className="h-10 w-auto" />
              <img src={logotext || "/placeholder.svg"} alt="Logo text" className="h-8 w-auto mt-1 hidden sm:block" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/que-hacemos">¿Qué hacemos?</NavLink>
            <NavLink href="/sobre-nosotros">¿Quiénes somos?</NavLink>
          </nav>

          {/* Login Button (Desktop) */}
          <div className="hidden md:block">
            {auth ? (
              <Link to="/home">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-[#2D6A4F] transition-colors cursor-pointer"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="bg-white text-[#2D6A4F] hover:bg-opacity-90 transition-all shadow-lg cursor-pointer">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#1B4332] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden" style={{ backgroundColor: "#2D6A4F" }}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/what-we-do">What do we do?</MobileNavLink>
            <MobileNavLink href="/who-we-are">Who we are</MobileNavLink>

            {/* Login Button (Mobile) */}
            <div className="pt-4 pb-3 border-t border-[#1B4332]">
              {auth ? (
                <Link to="/home">
                  <Button className="w-full bg-white text-[#2D6A4F] hover:bg-opacity-90 cursor-pointer">Dashboard</Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button className="w-full bg-white text-[#2D6A4F] hover:bg-opacity-90 cursor-pointer">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
	)}
  // Desktop Navigation Link
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      className="text-white text-lg font-medium relative hover:text-white/90 transition-colors duration-200 group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

// Mobile Navigation Link
function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#1B4332] transition-colors"
    >
      {children}
    </Link>
  )
}
