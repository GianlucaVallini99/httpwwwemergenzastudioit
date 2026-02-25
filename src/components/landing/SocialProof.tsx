import { Users, Award, UserCheck } from "lucide-react";

const items = [
  { icon: Users, label: "150+", text: "Studenti seguiti" },
  { icon: Award, label: "100%", text: "Tutor qualificati" },
  { icon: UserCheck, label: "5+", text: "Anni di esperienza" },
];

const SocialProof = () => (
  <section className="bg-primary py-8">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        {items.map(({ icon: Icon, label, text }) => (
          <div key={text} className="flex items-center gap-4 text-primary-foreground">
            <Icon className="w-6 h-6 text-accent" />
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold">{label}</span>
              <span className="font-display text-sm uppercase tracking-widest opacity-80">{text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
