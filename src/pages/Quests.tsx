import { useFinanceStore } from "@/hooks/useFinanceStore";
import { Button } from "@/components/ui/button";
import { Coins, Star, Check } from "lucide-react";
import { toast } from "sonner";

const Quests = () => {
  const { data, completeQuest } = useFinanceStore();

  const handleCompleteQuest = (questId: string, questTitle: string, coins: number, xp: number) => {
    completeQuest(questId);
    toast.success(`Quest completed! +${coins} coins, +${xp} XP`, {
      description: questTitle,
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pt-24 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Daily Quests</h1>
          <p className="text-muted-foreground">Complete quests to earn coins and XP!</p>
        </div>

        <div className="grid gap-4">
          {data.quests.map((quest) => (
            <div 
              key={quest.id} 
              className={`cloud-card p-6 transition-all ${
                quest.completed ? "opacity-60" : "hover:scale-[1.02]"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    {quest.title}
                    {quest.completed && (
                      <Check className="w-5 h-5 text-accent-foreground" />
                    )}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{quest.description}</p>
                  
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Coins className="w-4 h-4 text-secondary-foreground" />
                      <span className="font-medium">{quest.coins} coins</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-accent-foreground" />
                      <span className="font-medium">{quest.xp} XP</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleCompleteQuest(quest.id, quest.title, quest.coins, quest.xp)}
                  disabled={quest.completed}
                  className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {quest.completed ? "Completed" : "Complete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quests;
