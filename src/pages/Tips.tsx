import { Lightbulb, PiggyBank, TrendingUp, Shield, Target } from "lucide-react";

const tips = [
  {
    icon: PiggyBank,
    title: "Start an Emergency Fund",
    description: "Aim to save 3-6 months of expenses for unexpected situations. Start small and build gradually.",
    color: "ghibli-gradient-lavender",
  },
  {
    icon: TrendingUp,
    title: "Track Your Spending",
    description: "Monitor where your money goes each month. Small expenses add up quickly over time.",
    color: "ghibli-gradient-pink",
  },
  {
    icon: Shield,
    title: "Budget with the 50/30/20 Rule",
    description: "50% for needs, 30% for wants, and 20% for savings. Adjust based on your situation.",
    color: "ghibli-gradient-sky",
  },
  {
    icon: Target,
    title: "Set Financial Goals",
    description: "Define clear, achievable goals. Whether it's saving for a trip or paying off debt, having targets helps.",
    color: "ghibli-gradient-sunset",
  },
  {
    icon: PiggyBank,
    title: "Pay Yourself First",
    description: "Set up automatic transfers to savings right after payday. Treat savings as a non-negotiable expense.",
    color: "ghibli-gradient-lavender",
  },
  {
    icon: TrendingUp,
    title: "Avoid Impulse Purchases",
    description: "Wait 24-48 hours before buying non-essentials. Often, the urge to buy will pass and you'll save money.",
    color: "ghibli-gradient-pink",
  },
  {
    icon: Shield,
    title: "Build Multiple Income Streams",
    description: "Diversify your income sources through side projects, investments, or passive income opportunities.",
    color: "ghibli-gradient-sky",
  },
  {
    icon: Target,
    title: "Review Subscriptions Regularly",
    description: "Cancel unused subscriptions and services. Those small monthly fees can add up to hundreds per year.",
    color: "ghibli-gradient-sunset",
  },
  {
    icon: PiggyBank,
    title: "Use the Envelope Method",
    description: "Allocate cash to envelopes for different spending categories. When an envelope is empty, stop spending in that category.",
    color: "ghibli-gradient-lavender",
  },
  {
    icon: TrendingUp,
    title: "Invest in Your Future Self",
    description: "Start investing early, even with small amounts. Compound interest works best over time.",
    color: "ghibli-gradient-pink",
  },
  {
    icon: Shield,
    title: "Compare Before You Buy",
    description: "Always compare prices across different stores or websites. Use price tracking tools to find the best deals.",
    color: "ghibli-gradient-sky",
  },
  {
    icon: Target,
    title: "Learn to Cook at Home",
    description: "Eating out regularly drains your budget. Meal planning and home cooking can save thousands annually.",
    color: "ghibli-gradient-sunset",
  },
];

const Tips = () => {
  return (
    <div className="min-h-screen pt-20 pb-24 md:pt-24 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full ghibli-gradient-sunset mb-4">
            <Lightbulb className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Money Tips</h1>
          <p className="text-muted-foreground">Simple advice for a healthier financial life</p>
        </div>

        <div className="grid gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div 
                key={index} 
                className={`cloud-card p-6 ${tip.color}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/50">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{tip.title}</h3>
                    <p className="text-foreground/80">{tip.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cloud-card p-8 text-center mt-8">
          <h3 className="text-lg font-semibold mb-2">Remember</h3>
          <p className="text-muted-foreground">
            Building good financial habits takes time. Start small, stay consistent, and celebrate your progress! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tips;
