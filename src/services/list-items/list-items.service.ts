import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.service';
import { MovieListItem, MovieListItemData } from './list-items.types';

export async function getMovieListItems() {
  const userId = getUserId();
  const movieListRef = collection(db, 'users', userId, 'movieLists');
  const querySnapshot = await getDocs(movieListRef);

  const movies = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as MovieListItem[];

  return {
    favorites: movies.filter((movie) => movie.type === 'favorite'),
    watchlist: movies.filter((movie) => movie.type === 'watchlist'),
  };
}

export async function deleteMovieFromList(docId: string) {
  try {
    const userId = getUserId();
    const movieDocRef = doc(db, 'users', userId, 'movieLists', docId);
    await deleteDoc(movieDocRef);
  } catch (error) {
    return Promise.reject(error);
  }
}

export function addMovieToFavorites({ movie }: { movie: MovieListItemData }) {
  return addMovieToList({ movie, type: 'favorite' });
}

export function addMovieToWatchList({ movie }: { movie: MovieListItemData }) {
  return addMovieToList({ movie, type: 'watchlist' });
}

async function addMovieToList({
  movie,
  type,
}: {
  movie: MovieListItemData;
  type: 'favorite' | 'watchlist';
}) {
  try {
    const userId = getUserId();
    const newMovieRef = doc(collection(db, 'users', userId, 'movieLists'));
    const movieItem = {
      type,
      movieId: movie.id,
      ownerId: userId,
      movie,
    };
    await setDoc(newMovieRef, movieItem);
  } catch (error) {
    return Promise.reject(error);
  }
}

function getUserId() {
  const user = auth.currentUser;
  if (!user) throw new Error('User is not authenticated');
  return user.uid;
}
