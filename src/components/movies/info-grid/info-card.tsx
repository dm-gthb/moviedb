import { Link, LinkProps } from 'react-router';
import { ComponentProps, ReactNode } from 'react';

const linkClassname =
  'underline underline-offset-2 decoration-zinc-400 dark:decoration-gray-500 hover:decoration-current';

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="z-20 flex flex-col gap-4 rounded bg-gray-100 px-6 py-8 shadow-md lg:flex dark:bg-gray-800 dark:shadow-gray-950">
      {children}
    </div>
  );
}

export function CardSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 dark:font-normal dark:text-white">
        {title}
      </h3>
      <p className="text-gray-900 dark:text-gray-400">{children}</p>
    </div>
  );
}

export function CardLink({ to, className, children }: LinkProps) {
  return (
    <Link to={to} className={`${linkClassname} ${className}`}>
      {children}
    </Link>
  );
}

export function CardAnchor({ href, children }: ComponentProps<'a'>) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className={`${linkClassname} block cursor-pointer overflow-ellipsis`}
    >
      {children}
    </a>
  );
}

export function LoadingCard() {
  return (
    <div className="aspect-video animate-pulse rounded border-white bg-gray-100 shadow-md lg:aspect-square dark:bg-gray-800" />
  );
}
