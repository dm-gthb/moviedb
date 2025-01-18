import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, Children, isValidElement, ReactNode } from 'react';

export function Select({
  name,
  value,
  onChange,
  children,
  className,
}: {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative w-max">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="opacity-0 absolute left-0 right-0 bottom-0 top-0 w-full h-full peer"
      >
        {children}
      </select>
      <div
        className={`${className} peer-focus:outline outline-blue-800 -outline-offset-2 outline-2`}
      >
        {getDisplayedValue(value, children)}
        <ChevronDownIcon width={20} height={20} className="translate-y-[1px]" />
      </div>
    </div>
  );
}

function getDisplayedValue(value: string, children: ReactNode) {
  const selectedChild = Children.toArray(children).find(
    (child) => isValidElement(child) && child.props.value === value,
  );
  return isValidElement(selectedChild) && selectedChild?.props?.children;
}
