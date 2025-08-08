export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  ref?: React.RefObject<HTMLLabelElement | null>;
}

export const Label = ({ ref, ...props }: LabelProps) => <label ref={ref} {...props} />;
