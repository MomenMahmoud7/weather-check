import { FC } from "react";
import { TabsProps } from "./Tabs.types";

const Tabs: FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="w-full" data-testid="tabs-container">
      <div className="border-b-2 border-zinc-200" data-testid="tabs-list">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-3 -mb-[2px] border-b-2 cursor-pointer transition-all duration-300 ${
              activeTab === index
                ? "border-black text-black hover:bg-zinc-100"
                : "border-zinc-200 text-zinc-400 hover:bg-zinc-100"
            }`}
            data-testid={`tab-${index}`}
            onClick={() => onTabChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-10" data-testid="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
