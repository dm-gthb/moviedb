import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Children, isValidElement, ReactElement, ReactNode } from 'react';

type OptionElementProps = {
  value: string;
};

type OptionElement = ReactElement<OptionElementProps>;

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: OptionElement[];
}

export const Select = ({ className, children, ...props }: SelectProps) => {
  return (
    <div className="relative w-max">
      <select
        className="peer absolute bottom-0 left-0 right-0 top-0 h-full w-full opacity-0"
        {...props}
      >
        {children}
      </select>
      <div
        className={`flex w-max items-center gap-2 rounded border-2 p-4 capitalize outline-2 -outline-offset-2 outline-blue-800 peer-focus:outline ${className || ''}`}
      >
        {getDisplayedValue(props.value as string, children)}
        <ChevronDownIcon width={20} height={20} className="translate-y-[1px]" />
      </div>
    </div>
  );
};

function getDisplayedValue(value: string, children: OptionElement[]) {
  const selectedChild = Children.toArray(children).find(
    (child) => isValidElement<OptionElementProps>(child) && child.props.value === value,
  );
  return (
    isValidElement<{ children: ReactNode }>(selectedChild) &&
    selectedChild?.props?.children
  );
}
