import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Dashboard from "@/pages/Dashboard";
import Quests from "@/pages/Quests";
import Shop from "@/pages/Shop";
import Inventory from "@/pages/Inventory";
import Tips from "@/pages/Tips";
import Tracker from "@/pages/Tracker";
import NotFound from "@/pages/NotFound";
const queryClient = new QueryClient();
const App = () => <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;
export default App;