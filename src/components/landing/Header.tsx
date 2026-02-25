import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Servizi", href: "#servizi" },
  { label: "Le nostre tariffe", href: "#tariffe" },
  { label: "Chi siamo", href: "#chi-siamo" },
  { label: "Contatti", href: "#contatti" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-4 md:px-6">
        {/* Logo */}
        <button onClick={() => scrollTo("#home")} className="flex items-center gap-3">
          <img src={logo} alt="Emergenza Studio" className="w-11 h-11 rounded-xl object-cover" />
          <span className="font-display font-bold text-xl tracking-wide text-primary hidden sm:inline">
            EMERGENZA STUDIO
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-display text-sm font-medium tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left pb-1"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => scrollTo("#contatti")}
            className="rounded-full px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display uppercase tracking-wider text-sm"
          >
            Prenota Lezione
          </Button>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Menu di navigazione</SheetTitle>
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="font-display text-lg font-medium uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("#contatti")}
                className="rounded-full mt-4 bg-secondary hover:bg-secondary/90 font-display uppercase tracking-wider"
              >
                Prenota Lezione
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
