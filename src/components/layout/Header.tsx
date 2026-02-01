import { Shield, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ashokaChakra from "@/assets/ashoka-chakra.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/register", label: "Register" },
    { href: "/track", label: "Track Application" },
    { href: "/login", label: "Voter Login" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Government stripe */}
      <div className="govt-header py-2">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <img src={ashokaChakra} alt="Ashoka Chakra" className="h-6 w-6 object-contain brightness-0 invert" />
            <span className="hidden sm:inline font-medium">Government of India | भारत सरकार</span>
            <span className="sm:hidden font-medium">GOI</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/admin/login" className="hover:underline">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="glass-effect border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground overflow-hidden">
              <img src={ashokaChakra} alt="Ashoka Chakra" className="h-7 w-7 object-contain brightness-0 invert" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary">SecureVote India</h1>
              <p className="text-xs text-muted-foreground">Blockchain E-Voting System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-card animate-fade-in">
            <div className="container py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
