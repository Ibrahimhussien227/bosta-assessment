import { FEATURES } from "@/constants";

const FeatureSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {FEATURES.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-4">
              <Icon className="h-6 w-6 text-slate-700" />
            </div>
            <h1 className="font-semibold text-slate-900 mb-2">
              {feature.title}
            </h1>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </div>
        );
      })}
    </section>
  );
};

export default FeatureSection;
