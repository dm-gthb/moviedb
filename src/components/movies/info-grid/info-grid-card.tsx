import { InfoItems } from '../../../services/movies/movie-categorized-data.service';

export function InfoGridCard({ items }: { items: InfoItems }) {
  return (
    <div className="flex flex-col gap-4 px-6 py-8 shadow-md rounded bg-gray-100 dark:bg-gray-800">
      {items?.map(({ title, content, isLink }) => {
        if (content) {
          return (
            <div key={title}>
              <h3 className="dark:text-white font-semibold dark:font-normal text-gray-900">
                {title}
              </h3>
              <p
                className={`dark:text-gray-400 text-gray-900 ${isLink && 'overflow-ellipsis'}`}
              >
                {isLink ? (
                  <a
                    href={content}
                    rel="nofollow noopener noreferrer external"
                    target="_blank"
                  >
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
      {items.every(({ content }) => Boolean(content) === false) && (
        <span>No Info Yet</span>
      )}
    </div>
  );
}

export function LoadingInfoGridCard() {
  return (
    <div className="border-white shadow-md rounded bg-gray-100 dark:bg-gray-800 animate-pulse aspect-square" />
  );
}
