import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";

const CTASection = () => {
  return (
    <section className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        Ready to get started?
      </h2>
      <p className="text-slate-300 mb-8 max-w-xl mx-auto">
        Create an account today and start shopping for your favorite products.
        It's quick and easy!
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link to="/signup">
          <Button variant="success" size="lg" className="cursor-pointer">
            Create Account
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="outline" size="lg" className="cursor-pointer">
            Browse Products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
