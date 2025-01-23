import { InformationCircleIcon } from '@heroicons/react/24/outline';

export function AuthFormError({ errorMessage }: { errorMessage?: string }) {
  return (
    <div
      role="alert"
      className="flex items-center gap-4 py-3 px-4 bg-red-500 dark:bg-red-600 text-white text-sm rounded mb-4"
    >
      <InformationCircleIcon width={24} height={24} className="shrink-0" />
      <span>{errorMessage ?? 'There was an error.'}</span>
    </div>
  );
}
