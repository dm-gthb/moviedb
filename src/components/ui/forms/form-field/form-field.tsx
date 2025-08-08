import { ReactNode, useId } from 'react';
import { Label, LabelProps } from '../label/label';
import { Input } from '../input/input';
import type { InputProps } from '../input/input';
import { FormErrors, type Errors } from '../form-errors/form-errors';

export function FormField({
  labelProps,
  inputProps,
  errors,
  className,
  isReserveErrorSpace = true,
  endAdornment,
}: {
  labelProps: LabelProps;
  inputProps: InputProps;
  errors?: Errors;
  className?: string;
  isReserveErrorSpace?: boolean;
  endAdornment?: ReactNode;
}) {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  const inputClassName = `${inputProps.className ?? ''} ${endAdornment ? 'pr-12' : ''}`;

  const InputWithProps = (
    <Input
      id={id}
      aria-invalid={errorId ? true : undefined}
      aria-describedby={errorId}
      className={inputClassName}
      {...inputProps}
    />
  );

  return (
    <div className={`flex flex-col gap-1 ${className ?? ''}`}>
      <Label {...labelProps} htmlFor={id} />
      {endAdornment ? (
        <div className="relative">
          {InputWithProps}
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center pr-3">
            {endAdornment}
          </div>
        </div>
      ) : (
        InputWithProps
      )}
      {errorId ? (
        <div className="min-h-[32px] pb-3">
          <FormErrors id={errorId} errors={errors} />
        </div>
      ) : isReserveErrorSpace ? (
        <div className="min-h-[32px] pb-3 pt-1" />
      ) : null}
    </div>
  );
}
