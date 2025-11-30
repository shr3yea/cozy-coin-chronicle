import { useState, useEffect } from "react";

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  coins: number;
  xp: number;
  completed: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  type: "background" | "theme";
  price: number;
  image: string;
  owned: boolean;
}

export interface UserData {
  balance: number;
  coins: number;
  xp: number;
  level: number;
  transactions: Transaction[];
  quests: Quest[];
  inventory: ShopItem[];
}

const initialData: UserData = {
  balance: 1250.50,
  coins: 100,
  xp: 0,
  level: 1,
  transactions: [
    { id: "1", type: "income", amount: 500, description: "Freelance project", date: new Date().toISOString() },
    { id: "2", type: "expense", amount: 45.50, description: "Groceries", date: new Date().toISOString() },
    { id: "3", type: "expense", amount: 120, description: "Utilities", date: new Date().toISOString() },
  ],
  quests: [
    { id: "1", title: "Track your spending", description: "Add 3 transactions today", coins: 20, xp: 50, completed: false },
    { id: "2", title: "Save for the future", description: "Set aside $50 in savings", coins: 30, xp: 75, completed: false },
    { id: "3", title: "Budget review", description: "Review your monthly budget", coins: 25, xp: 60, completed: false },
  ],
  inventory: [],
};

export const useFinanceStore = () => {
  const [data, setData] = useState<UserData>(() => {
    const stored = localStorage.getItem("financeData");
    return stored ? JSON.parse(stored) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("financeData", JSON.stringify(data));
  }, [data]);

  const addTransaction = (transaction: Omit<Transaction, "id" | "date">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    setData(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
      balance: transaction.type === "income" 
        ? prev.balance + transaction.amount 
        : prev.balance - transaction.amount,
    }));
  };

  const completeQuest = (questId: string) => {
    const quest = data.quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    setData(prev => ({
      ...prev,
      coins: prev.coins + quest.coins,
      xp: prev.xp + quest.xp,
      level: Math.floor((prev.xp + quest.xp) / 100) + 1,
      quests: prev.quests.map(q => 
        q.id === questId ? { ...q, completed: true } : q
      ),
    }));
  };

  const purchaseItem = (itemId: string, price: number) => {
    if (data.coins < price) return false;

    setData(prev => ({
      ...prev,
      coins: prev.coins - price,
    }));
    
    return true;
  };

  const addToInventory = (item: ShopItem) => {
    setData(prev => ({
      ...prev,
      inventory: [...prev.inventory, { ...item, owned: true }],
    }));
  };

  return {
    data,
    addTransaction,
    completeQuest,
    purchaseItem,
    addToInventory,
  };
};
