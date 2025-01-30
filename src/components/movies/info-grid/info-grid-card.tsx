import { InfoItems } from '../../../services/movies/movie-categorized-data.service';

export function InfoGridCard({ items }: { items: InfoItems }) {
  const isNoData = items.every(({ content }) => Boolean(content) === false);
  return (
    <div
      className={`${isNoData && 'hidden'} flex flex-col gap-4 rounded bg-gray-100 px-6 py-8 shadow-md lg:flex dark:bg-gray-800`}
    >
      {items?.map(({ title, content, isLink }) => {
        if (content) {
          return (
            <div key={title}>
              <h3 className="font-semibold text-gray-900 dark:font-normal dark:text-white">
                {title}
              </h3>
              <p
                className={`text-gray-900 dark:text-gray-400 ${isLink && 'overflow-ellipsis'}`}
              >
                {isLink ? (
                  <a href={content} rel="noopener noreferrer" target="_blank">
                    {content}
                  </a>
                ) : (
                  <>{content}</>
                )}
              </p>
            </div>
          );
        }
      })}
      {isNoData && <span className="text-gray-900 dark:text-gray-400">No Info Yet</span>}
    </div>
  );
}

export function LoadingInfoGridCard() {
  return (
    <div className="aspect-video animate-pulse rounded border-white bg-gray-100 shadow-md lg:aspect-square dark:bg-gray-800" />
  );
}
