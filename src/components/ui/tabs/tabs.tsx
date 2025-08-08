// Temporary tabs component - will be replaced with routes
import { ReactNode, useState, createContext, useContext } from 'react';

const TabsContext = createContext<{
  activeTab: number;
  setActiveTab: (index: number) => void;
}>({ activeTab: 0, setActiveTab: () => {} });

export function Tabs({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function TabTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const [currentIndex] = useState(() => {
    // This is a simplified approach - in a real implementation you'd track index properly
    return 0;
  });
  
  return (
    <button 
      className={className} 
      onClick={() => setActiveTab(currentIndex)}
      data-state={activeTab === currentIndex ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
}

export function TabPanels({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function TabPanel({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}