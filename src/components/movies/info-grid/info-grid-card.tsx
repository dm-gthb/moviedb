import { Fragment } from 'react/jsx-runtime';
import { InfoItems } from '../../../services/movies/movie-categorized-data.service';

export function InfoGridCard({ items }: { items: InfoItems }) {
  return (
    <div className="shadow-md px-6 py-8 rounded bg-gray-100 dark:bg-gray-800">
      {items?.map(({ title, content, isLink }, i) => {
        if (content) {
          return (
            <Fragment key={title}>
              <h3 className="dark:text-white font-semibold dark:font-normal text-gray-900">
                {title}
              </h3>
              <p
                className={`dark:text-gray-400 text-gray-900 ${i !== items.length - 1 && 'mb-4'} ${isLink && 'overflow-ellipsis'}`}
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
            </Fragment>
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
