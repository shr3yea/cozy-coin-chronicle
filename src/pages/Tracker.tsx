import { useState } from "react";
import { useFinanceStore } from "@/hooks/useFinanceStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";

const Tracker = () => {
  const { addTransaction } = useFinanceStore();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    addTransaction({
      type,
      amount: numAmount,
      description,
    });

    toast.success(`${type === "income" ? "Income" : "Expense"} added!`, {
      description: `${type === "income" ? "+" : "-"}$${numAmount.toFixed(2)}`,
    });

    setAmount("");
    setDescription("");
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pt-24 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Money</h1>
          <p className="text-muted-foreground">Add your income and expenses</p>
        </div>

        <div className="cloud-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setType("expense")}
                className={`flex-1 rounded-full transition-all ${
                  type === "expense"
                    ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                <TrendingDown className="w-4 h-4 mr-2" />
                Expense
              </Button>
              <Button
                type="button"
                onClick={() => setType("income")}
                className={`flex-1 rounded-full transition-all ${
                  type === "income"
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Income
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-2xl text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="What was this for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-2xl"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Transaction
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
