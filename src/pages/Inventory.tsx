import { useFinanceStore } from "@/hooks/useFinanceStore";
import { Package } from "lucide-react";

const Inventory = () => {
  const { data } = useFinanceStore();

  return (
    <div className="min-h-screen pt-20 pb-24 md:pt-24 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">My Inventory</h1>
          <p className="text-muted-foreground">Your unlocked items and customizations</p>
        </div>

        {data.inventory.length === 0 ? (
          <div className="cloud-card p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">No items yet</h3>
            <p className="text-muted-foreground">
              Visit the shop to purchase backgrounds and themes!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {data.inventory.map((item) => (
              <div 
                key={item.id} 
                className="cloud-card p-6 text-center hover:scale-105 transition-all cursor-pointer"
              >
                <div className="text-6xl mb-3">{item.image}</div>
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium capitalize">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
