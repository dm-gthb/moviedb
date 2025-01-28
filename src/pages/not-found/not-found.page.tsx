import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-lg">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Page not found</h1>
      <p className="mb-8 text-center">
        Sorry, the page you were looking for could not be found.
      </p>
      <Link
        to="/"
        className="rounded-md bg-gray-200 px-12 py-4 transition-colors hover:bg-gray-300 dark:bg-gray-700 hover:dark:bg-gray-800"
      >
        Home
      </Link>
    </div>
  );
}
