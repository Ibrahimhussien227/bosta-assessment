import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import FeatureProductSection from "../components/FeatureProductSection";
import CTASection from "../components/CTASection";
import { useAuthStore } from "@/stores/auth/authStore";

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current!.querySelectorAll(":scope > *"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-16">
      <HeroSection />
      <FeatureSection />
      <FeatureProductSection />
      {!isAuthenticated && <CTASection />}
    </div>
  );
}
