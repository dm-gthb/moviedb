import { useNavigate } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';
import { appRoute } from '../../../services/router.service';
import {
  useAddRatingMutation,
  useDeleteRatingMutation,
  useListItems,
  useUpdateRatingMutation,
} from '../../../queries/list-items.queries';
import {
  ListItemMovie,
  MovieDetails,
  MovieItem,
} from '../../../services/movies/movies.types.service';
import { getListItemMovie } from '../../../services/movies/movies.utils.service';
import { StarIcon } from '@heroicons/react/24/outline';

export function RatingToggler({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      className="flex shrink-0 p-3.5 group bg-gray-800 hover:bg-gray-700 hover:scale-105 transition rounded-full"
      disabled={false}
    >
      <StarIcon width={24} height={24} className="text-white dark:text-gray-100" />
      <span className="sr-only">
        Toggle rating range
        {/* todo update */}
      </span>
    </button>
  );
}

export function RatingButtons({
  movie,
}: {
  movie: MovieItem | MovieDetails | ListItemMovie;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <button onClick={() => navigate(appRoute.auth)}>add rating</button>;
  }

  return <AuthorizedUserButtons movie={getListItemMovie(movie)} />;
}

function AuthorizedUserButtons({ movie }: { movie: ListItemMovie }) {
  const { data } = useListItems();
  const ratedItem = data?.rated.find((item) => item.movieId === movie.id);
  const addRatingMutation = useAddRatingMutation();
  const updateRatingMutation = useUpdateRatingMutation();
  const deleteRatingMutation = useDeleteRatingMutation();

  return (
    <div>
      {ratedItem ? (
        <div>
          <p>your rating is {ratedItem.rating}</p>
          <button
            onClick={() =>
              updateRatingMutation.mutate({ listItemId: ratedItem.id, rating: 9 })
            }
          >
            update rating to 9
          </button>
          <button
            onClick={() =>
              updateRatingMutation.mutate({ listItemId: ratedItem.id, rating: 10 })
            }
          >
            update rating to 10
          </button>
          <button
            onClick={() => deleteRatingMutation.mutate({ listItemId: ratedItem.id })}
            disabled={deleteRatingMutation.isPending}
          >
            delete rating
          </button>
        </div>
      ) : (
        <button
          onClick={() => addRatingMutation.mutate({ movie, rating: 10 })}
          disabled={addRatingMutation.isPending}
        >
          add rating
        </button>
      )}
    </div>
  );
}
