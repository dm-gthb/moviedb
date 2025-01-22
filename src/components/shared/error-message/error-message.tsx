export function ErrorMessage({ error }: { error: Error }) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-10 text-base">
      <p>There was an error. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}
