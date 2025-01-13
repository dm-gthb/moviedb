export function ErrorMessage({ error }: { error: Error }) {
  return (
    <div>
      <p>There was an error. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}
