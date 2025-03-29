// https://developer.themoviedb.org/docs/image-basics
enum BackdropSize {
  w300 = 'w300',
  w780 = 'w780',
  w1280 = 'w1280',
  original = 'original',
}

enum PosterSize {
  w92 = 'w92',
  w154 = 'w154',
  w185 = 'w185',
  w342 = 'w342',
  w500 = 'w500',
  w780 = 'w780',
  original = 'original',
}

export function createPosterSrc(posterPath: string) {
  return createSrcUrl(PosterSize.w500, posterPath);
}

export function createBackdropSrc(backdropPath: string) {
  return createSrcUrl(BackdropSize.w1280, backdropPath);
}

export function prefetchBackdropImage(backdropPath: string | null) {
  if (backdropPath) {
    prefetchImage(createBackdropSrc(backdropPath));
  }
}

export function prefetchImage(src: string | null) {
  if (src) {
    const img = new Image();
    img.src = src;
  }
}

function createSrcUrl(size: string, path: string) {
  const imageUrl = 'https://image.tmdb.org/t/p';
  return `${imageUrl}/${size}/${path}`;
}
