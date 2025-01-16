import React, { useState, useRef, useEffect } from 'react';
import { Tab } from '../types/Tab';

interface TabBarProps {
  tabs: Tab[];
}

const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const updateIndicator = () => {
      const currentTab = tabRefs.current[activeTab];
      if (currentTab) {
        setIndicatorStyle({
          left: `${currentTab.offsetLeft}px`,
          width: `${currentTab.offsetWidth}px`,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="flex border-b border-gray-200" role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={`py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === index
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`tabpanel-${index}`}
              id={`tab-${index}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out"
          style={indicatorStyle}
        />
      </div>
      <div className="mt-4 relative">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`transition-opacity duration-300 absolute top-0 left-0 w-full ${
              activeTab === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            id={`tabpanel-${index}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;

