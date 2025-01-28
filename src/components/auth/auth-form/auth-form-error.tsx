import { InformationCircleIcon } from '@heroicons/react/24/outline';

export function AuthFormError({ errorMessage }: { errorMessage?: string }) {
  return (
    <div
      role="alert"
      className="mb-4 flex items-center gap-4 rounded bg-red-500 px-4 py-3 text-sm text-white dark:bg-red-600"
    >
      <InformationCircleIcon width={24} height={24} className="shrink-0" />
      <span>{errorMessage ?? 'There was an error.'}</span>
    </div>
  );
}
