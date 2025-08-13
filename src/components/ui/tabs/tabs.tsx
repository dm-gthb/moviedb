import {
  Children,
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  KeyboardEvent,
  useRef,
  RefCallback,
} from 'react';

const TabsContext = createContext<
  | { activeTabIndex: number; setActiveTabIndex: Dispatch<SetStateAction<number>> }
  | undefined
>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error(`useTabs must be used within TabsContext provider`);
  }
  return context;
}

export function Tabs({
  children,
  defaultIndex,
}: {
  children: ReactNode;
  defaultIndex?: number;
}) {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex ?? 0);
  return (
    <TabsContext.Provider value={{ activeTabIndex, setActiveTabIndex }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabList({
  children,
  className,
}: {
  children: ReactElement<TabTriggerProps>[];
  className?: string;
}) {
  const { setActiveTabIndex } = useTabs();
  const tabsCount = children.length;
  const itemsRef = useRef<Map<number, HTMLButtonElement> | null>(null);

  const getMap = () => {
    if (!itemsRef?.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  };

  const handleKeydown = (e: KeyboardEvent, index: number) => {
    const activateTab = (index: number) => {
      setActiveTabIndex(index);
      const map = getMap();
      const node = map.get(index);
      node?.focus();
    };

    if (e.key === 'ArrowRight') {
      if (index + 1 < tabsCount) {
        return activateTab(index + 1);
      }

      return activateTab(0);
    }

    if (e.key === 'ArrowLeft') {
      if (index > 0) {
        return activateTab(index - 1);
      }
      return activateTab(tabsCount - 1);
    }
  };

  return (
    <div role="tablist" className={className}>
      {Children.map(children, (child, index) => {
        return cloneElement(child, {
          ...child.props,
          index,
          handleKeydown,
          ref: (node: HTMLButtonElement) => {
            const map = getMap();
            map.set(index, node);
            return () => {
              map.delete(index);
            };
          },
        });
      })}
    </div>
  );
}

type TabTriggerProps = {
  children: ReactNode;
  className?: string;
  onClick?: (args: unknown) => void;
  index?: number;
  handleKeydown?: (e: KeyboardEvent<HTMLButtonElement>, index: number) => void;
  ref?: RefCallback<HTMLButtonElement>;
};
export function TabTrigger({
  children,
  className,
  onClick,
  index = 0,
  handleKeydown,
  ref,
}: TabTriggerProps) {
  const { activeTabIndex, setActiveTabIndex } = useTabs();
  const isActive = activeTabIndex === index;

  return (
    <button
      data-state={isActive ? 'active' : 'inactive'}
      className={className}
      onClick={(...args) => {
        onClick?.(...args);
        setActiveTabIndex(index);
      }}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabPanel-${index}`}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={(e) => handleKeydown?.(e, index)}
      ref={ref}
    >
      {children}
    </button>
  );
}

export function TabPanels({
  children,
  className,
}: {
  children: ReactElement<TabPanelProps>[];
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        return cloneElement(child, { ...child.props, index });
      })}
    </div>
  );
}

type TabPanelProps = {
  children: ReactNode;
  index?: number;
};
export function TabPanel({ children, index }: TabPanelProps) {
  const { activeTabIndex } = useTabs();

  return activeTabIndex === index ? (
    <div role="tabpanel" id={`tabPanel-${index}`}>
      {children}
    </div>
  ) : null;
}
