export type Errors = Array<string | null | undefined> | null | undefined;

export function FormErrors({ id, errors }: { id?: string; errors?: Errors }) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) {
    return null;
  }
  return (
    <ul id={id} className="flex flex-col gap-1">
      {errorsToRender.map((e) => (
        <li key={e} className="text-c text-xs text-red-600">
          {e}
        </li>
      ))}
    </ul>
  );
}
