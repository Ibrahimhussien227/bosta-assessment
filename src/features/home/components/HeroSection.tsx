import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useAuthStore } from "@/stores/auth/authStore";
import { Button } from "@/components/ui/Button";

const HeroSection = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="text-center py-16">
      <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
        Welcome to <span className="text-slate-900">BostaStore</span>
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
        Discover amazing products at great prices. Shop with confidence using
        our secure platform.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link to="/products">
          <Button size="lg" className="cursor-pointer">
            Shop Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </Link>
        {!isAuthenticated && (
          <Link to="/login">
            <Button variant="outline" size="lg" className="cursor-pointer">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
