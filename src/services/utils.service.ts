export function getFormattedDate(date: Date) {
  return date.toISOString().split('T')[0];
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
