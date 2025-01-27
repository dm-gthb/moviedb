import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-lg">
      <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-4">Page not found</h1>
      <p className="mb-8 text-center">
        Sorry, the page you were looking for could not be found.
      </p>
      <Link
        to="/"
        className="py-4 px-12 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 hover:dark:bg-gray-800 transition-colors rounded-md"
      >
        Home
      </Link>
    </div>
  );
}
