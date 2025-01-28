export function ErrorMessage({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10 text-base">
      <p>There was an error. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}
