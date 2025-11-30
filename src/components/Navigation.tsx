import { NavLink } from "@/components/NavLink";
import { Home, Target, ShoppingBag, Package, Lightbulb, TrendingUp } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/quests", icon: Target, label: "Quests" },
    { to: "/shop", icon: ShoppingBag, label: "Shop" },
    { to: "/inventory", icon: Package, label: "Inventory" },
    { to: "/tips", icon: Lightbulb, label: "Tips" },
    { to: "/tracker", icon: TrendingUp, label: "Tracker" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border z-50 md:top-0 md:bottom-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-center md:gap-8 py-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-2xl text-muted-foreground transition-all duration-300 hover:bg-primary/10"
              activeClassName="text-primary bg-primary/10 shadow-sm"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs md:text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
