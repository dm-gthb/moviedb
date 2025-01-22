import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

export function Tabs({
  children,
  defaultValue,
}: {
  children: ReactNode;
  defaultValue?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultValue ?? '');
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabTrigger({
  value,
  label,
  className,
  onClick,
}: {
  value: string;
  label: string;
  className?: string;
  onClick?: (args: unknown) => void;
}) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      data-state={isActive ? 'active' : 'inactive'}
      className={className}
      onClick={(...args) => {
        onClick?.(...args);
        setActiveTab(value);
      }}
    >
      {label}
    </button>
  );
}

export function TabContent({ value, children }: { value: string; children: ReactNode }) {
  const { activeTab } = useContext(TabsContext);
  return value === activeTab ? children : null;
}
