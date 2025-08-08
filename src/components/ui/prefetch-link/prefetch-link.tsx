import { Link, LinkProps } from 'react-router';

const linkClassname =
  'underline underline-offset-2 decoration-zinc-400 dark:decoration-gray-500 hover:decoration-current';

type PrefetchLinkProps = LinkProps & {
  onPrefetch?: () => void;
};

export function PrefetchLink({
  to,
  className,
  children,
  onPrefetch,
  ...props
}: PrefetchLinkProps) {
  return (
    <Link
      to={to}
      className={`${linkClassname} ${className || ''}`}
      onMouseEnter={onPrefetch}
      onFocus={onPrefetch}
      {...props}
    >
      {children}
    </Link>
  );
}
