import {
  Children,
  cloneElement,
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
  children,
  className,
  onClick,
}: {
  value: string;
  children: ReactNode;
  className?: string;
  onClick?: (args: unknown) => void;
}) {
  const { setActiveTab } = useContext(TabsContext);
  return Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return (
        <button
          className={className}
          onClick={(...args) => {
            onClick?.(...args);
            setActiveTab(value);
          }}
        >
          {child}
        </button>
      );
    }

    return cloneElement(child, {
      ...child.props,
      className: { ...child.props.className, className },
      onClick: (...args: unknown[]) => {
        setActiveTab(value);
        child.props.onClick?.(...args);
      },
    });
  });
}

export function TabContent({ value, children }: { value: string; children: ReactNode }) {
  const { activeTab } = useContext(TabsContext);
  return value === activeTab ? children : null;
}
