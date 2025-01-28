import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, Children, isValidElement, ReactElement, ReactNode } from 'react';

type OptionElementProps = {
  value: string;
};

type OptionElement = ReactElement<OptionElementProps>;

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
  children: OptionElement[];
  className?: string;
}) {
  return (
    <div className="relative w-max">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="peer absolute bottom-0 left-0 right-0 top-0 h-full w-full opacity-0"
      >
        {children}
      </select>
      <div
        className={`${className} outline-2 -outline-offset-2 outline-blue-800 peer-focus:outline`}
      >
        {getDisplayedValue(value, children)}
        <ChevronDownIcon width={20} height={20} className="translate-y-[1px]" />
      </div>
    </div>
  );
}

function getDisplayedValue(value: string, children: OptionElement[]) {
  const selectedChild = Children.toArray(children).find(
    (child) => isValidElement<OptionElementProps>(child) && child.props.value === value,
  );
  return (
    isValidElement<{ children: ReactNode }>(selectedChild) &&
    selectedChild?.props?.children
  );
}
