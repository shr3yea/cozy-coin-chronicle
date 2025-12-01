import { useFinanceStore } from "@/hooks/useFinanceStore";
import { useMemo } from "react";
import PixelPet from "./PixelPet";

type MoodState = "happy" | "excited" | "neutral" | "worried" | "sad";

interface MoodConfig {
  petType: "bunny" | "cat" | "bear" | "dog" | "panda";
  message: string;
  color: string;
}

const moodConfigs: Record<MoodState, MoodConfig> = {
  excited: {
    petType: "bunny",
    message: "You're doing amazing! Keep it up!",
    color: "ghibli-gradient-sky",
  },
  happy: {
    petType: "cat",
    message: "Great financial habits!",
    color: "ghibli-gradient-lavender",
  },
  neutral: {
    petType: "bear",
    message: "Steady as she goes!",
    color: "ghibli-gradient-pink",
  },
  worried: {
    petType: "dog",
    message: "Let's be more mindful with spending...",
    color: "ghibli-gradient-sunset",
  },
  sad: {
    petType: "panda",
    message: "I believe in you! Let's save together.",
    color: "bg-muted",
  },
};

const FinancePet = () => {
  const { data } = useFinanceStore();

  const mood: MoodState = useMemo(() => {
    // Calculate recent spending vs income (last 5 transactions)
    const recentTransactions = data.transactions.slice(0, 5);
    const income = recentTransactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = recentTransactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // Check quest completion rate
    const completedQuests = data.quests.filter(q => q.completed).length;
    const questCompletionRate = data.quests.length > 0 
      ? completedQuests / data.quests.length 
      : 0;

    // Determine mood based on multiple factors
    if (data.balance > 1000 && questCompletionRate > 0.6) {
      return "excited";
    }

    if (income > expenses && questCompletionRate >= 0.3) {
      return "happy";
    }

    if (expenses > income * 1.5) {
      return "worried";
    }

    if (data.balance < 100) {
      return "sad";
    }

    return "neutral";
  }, [data]);

  const config = moodConfigs[mood];

  return (
    <div className={`cloud-card p-6 ${config.color} gentle-pulse relative overflow-hidden`}>
      {/* Decorative pixels */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-sm" />
      <div className="absolute top-5 right-5 w-2 h-2 bg-white/20 rounded-sm" />
      <div className="absolute bottom-3 left-3 w-2 h-2 bg-white/30 rounded-sm" />
      
      <div className="flex items-center gap-4">
        <div className="relative">
          {/* Pixelated pet */}
          <div className="p-2 rounded-2xl bg-white/30 backdrop-blur-sm">
            <PixelPet type="bunny" size={14} />
          </div>
          
          {/* Mood indicator dots */}
          <div className="absolute -top-1 -right-1 flex gap-1">
            <div className={`w-2 h-2 rounded-sm ${
              mood === "excited" || mood === "happy" ? "bg-accent" : "bg-muted/50"
            }`} />
            <div className={`w-2 h-2 rounded-sm ${
              mood === "excited" ? "bg-accent" : "bg-muted/50"
            }`} />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">Your Money Buddy</h3>
            <span className="px-2 py-0.5 rounded-full bg-white/40 text-xs font-medium capitalize">
              {mood}
            </span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{config.message}</p>
        </div>
      </div>

      {/* Progress bar showing overall financial health */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-foreground/70">Financial Health</span>
          <span className="font-medium text-foreground">
            {mood === "excited" ? "95%" : mood === "happy" ? "80%" : mood === "neutral" ? "60%" : mood === "worried" ? "40%" : "25%"}
          </span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              mood === "excited" || mood === "happy" 
                ? "bg-accent" 
                : mood === "neutral" 
                ? "bg-primary" 
                : "bg-destructive"
            }`}
            style={{ 
              width: mood === "excited" ? "95%" : mood === "happy" ? "80%" : mood === "neutral" ? "60%" : mood === "worried" ? "40%" : "25%"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancePet;
