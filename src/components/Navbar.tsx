import { Link, useLocation } from "react-router-dom";
import { LogOut, Package, User } from "lucide-react";

import { useAuthStore } from "@/stores/auth/authStore";
import { useCartStore } from "@/stores/cart/cartStore";
import { getNavLinks } from "@/utils/navLinks";
import { cn } from "@/lib/utils";
import { useLogout } from "@/features/auth/hooks/useAuth";
import { Button } from "./ui/Button";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  const { totalItems } = useCartStore();
  const { logout } = useLogout();

  const NAV_Links = getNavLinks(isAuthenticated, totalItems);

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            aria-label="BostaStore home"
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 hidden sm:block">
              BostaStore
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV_Links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-label={link.ariaLabel}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    isActive(link.href)
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:block">{link.label}</span>
                  {!!link.badge && link.badge > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center bg-slate-900 text-white text-xs rounded-full px-1">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-700">
                    {user?.username}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
