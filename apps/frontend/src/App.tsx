import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./configs/query";
import CitySearch from "./components/CitySearch";
import LocationSearch from "./components/LocationSearch";
import Tabs from "./components/ui/Tabs/Tabs";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Search by city",
      content: <CitySearch />,
    },
    {
      label: "Search by location",
      content: <LocationSearch />,
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-zinc-50">
        <h1 className="font-bold text-6xl text-center py-14 bg-black text-white">
          Weather Check
        </h1>
        <div className="max-w-2xl mx-auto py-10">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
