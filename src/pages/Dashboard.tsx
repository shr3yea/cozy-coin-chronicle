import { useFinanceStore } from "@/hooks/useFinanceStore";
import { Coins, TrendingUp, TrendingDown, Star } from "lucide-react";

const Dashboard = () => {
  const { data } = useFinanceStore();

  const recentTransactions = data.transactions.slice(0, 5);

  return (
    <div className="min-h-screen pt-20 pb-24 md:pt-24 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Sky Coins
          </h1>
          <p className="text-muted-foreground">Your cozy finance companion</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="cloud-card p-6 ghibli-gradient-lavender float-animation">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary-foreground/80">Balance</span>
              <TrendingUp className="w-5 h-5 text-primary-foreground/80" />
            </div>
            <p className="text-3xl font-bold text-primary-foreground">${data.balance.toFixed(2)}</p>
          </div>

          <div className="cloud-card p-6 ghibli-gradient-pink float-animation" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-secondary-foreground/80">Coins</span>
              <Coins className="w-5 h-5 text-secondary-foreground/80" />
            </div>
            <p className="text-3xl font-bold text-secondary-foreground">{data.coins}</p>
          </div>

          <div className="cloud-card p-6 ghibli-gradient-sky float-animation" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-accent-foreground/80">Level {data.level}</span>
              <Star className="w-5 h-5 text-accent-foreground/80" />
            </div>
            <p className="text-3xl font-bold text-accent-foreground">{data.xp} XP</p>
          </div>
        </div>

        <div className="cloud-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Recent Transactions
          </h2>
          
          <div className="space-y-3">
            {recentTransactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No transactions yet. Start tracking!</p>
            ) : (
              recentTransactions.map(transaction => (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === "income" ? "bg-accent/20" : "bg-destructive/20"
                    }`}>
                      {transaction.type === "income" ? (
                        <TrendingUp className="w-4 h-4 text-accent-foreground" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`font-semibold ${
                    transaction.type === "income" ? "text-accent-foreground" : "text-destructive-foreground"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
