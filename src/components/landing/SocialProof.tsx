import { Users, Award, UserCheck } from "lucide-react";

const items = [
  { icon: Users, text: "Dalle elementari all'università" },
  { icon: Award, text: "Tutor qualificati" },
  { icon: UserCheck, text: "Lezioni individuali e di gruppo" },
];

const SocialProof = () => (
  <section className="bg-primary py-5">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        {items.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-primary-foreground">
            <Icon className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">{text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
