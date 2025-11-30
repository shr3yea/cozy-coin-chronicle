import { useFinanceStore, ShopItem } from "@/hooks/useFinanceStore";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { toast } from "sonner";

const shopItems: ShopItem[] = [
  { id: "1", name: "Sunset Sky", type: "background", price: 50, image: "🌅", owned: false },
  { id: "2", name: "Starry Night", type: "background", price: 75, image: "🌌", owned: false },
  { id: "3", name: "Cloudy Day", type: "background", price: 40, image: "☁️", owned: false },
  { id: "4", name: "Pastel Dream", type: "theme", price: 100, image: "🎨", owned: false },
  { id: "5", name: "Ocean Breeze", type: "theme", price: 100, image: "🌊", owned: false },
  { id: "6", name: "Forest Whisper", type: "theme", price: 100, image: "🌲", owned: false },
];

const Shop = () => {
  const { data, purchaseItem, addToInventory } = useFinanceStore();

  const handlePurchase = (item: ShopItem) => {
    const isOwned = data.inventory.some(i => i.id === item.id);
    
    if (isOwned) {
      toast.error("You already own this item!");
      return;
    }

    const success = purchaseItem(item.id, item.price);
    
    if (success) {
      addToInventory(item);
      toast.success(`Purchased ${item.name}!`, {
        description: `-${item.price} coins`,
      });
    } else {
      toast.error("Not enough coins!", {
        description: `You need ${item.price - data.coins} more coins`,
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pt-24 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sky Shop</h1>
          <p className="text-muted-foreground">Customize your experience with coins</p>
          
          <div className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full ghibli-gradient-pink">
            <Coins className="w-5 h-5 text-secondary-foreground" />
            <span className="font-semibold text-secondary-foreground">{data.coins} coins</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {shopItems.map((item) => {
            const isOwned = data.inventory.some(i => i.id === item.id);
            
            return (
              <div 
                key={item.id} 
                className="cloud-card p-6 hover:scale-[1.02] transition-all"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{item.image}</div>
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium capitalize">
                    {item.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-secondary-foreground" />
                    <span className="font-semibold">{item.price}</span>
                  </div>
                  
                  <Button
                    onClick={() => handlePurchase(item)}
                    disabled={isOwned}
                    className="rounded-full px-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    {isOwned ? "Owned" : "Buy"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
