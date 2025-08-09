import { createBackdropSrc } from '../../../services/image/image.service';

export function MovieBanner({ backdropPath }: { backdropPath: string | null }) {
  return (
    <div
      className={`absolute inset-0 ${backdropPath ? 'bg-black' : 'bg-gray-600'} dark:bg-black`}
    >
      <div
        className="h-full w-full bg-cover bg-center opacity-35 dark:opacity-30"
        style={{
          backgroundImage: backdropPath
            ? `url(${createBackdropSrc(backdropPath)})`
            : 'none',
        }}
      />
    </div>
  );
}
