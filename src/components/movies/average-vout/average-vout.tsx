export function AverageVout({ averageVout }: { averageVout: number }) {
  const containerClassname = `inline-block px-1 text-white rounded ${averageVout >= 7 ? 'bg-green-600 dark:bg-green-600/80' : 'bg-gray-600'}`;
  return <span className={containerClassname}>{averageVout?.toFixed(1)}</span>;
}
