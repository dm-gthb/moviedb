export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.RefObject<HTMLInputElement | null>;
}

export const Input = ({ className, ref, ...props }: InputProps) => {
  return (
    <input
      ref={ref}
      className={`w-full rounded border-2 p-3 disabled:text-gray-400 dark:bg-gray-950 ${className || ''}`}
      {...props}
    />
  );
};
