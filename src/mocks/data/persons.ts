import { PersonMovieCredit } from '../types/movie';
import { PersonDetails } from '../types/person';
import { moviesData } from './movies';

export const personsData: Array<PersonDetails> = [
  {
    also_known_as: [],
    biography:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is mock data for development and testing purposes only.',
    birthday: '1977-09-15',
    deathday: null,
    gender: 2,
    homepage: null,
    id: 2524,
    imdb_id: '',
    known_for_department: 'Acting',
    name: 'Mock Person 1',
    place_of_birth: 'Hammersmith, London, England, UK',
    popularity: 4.5113,
    profile_path: '/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg',
  },
  {
    also_known_as: [],
    biography:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is mock data for development and testing purposes only.',
    birthday: '1977-07-10',
    deathday: null,
    gender: 2,
    homepage: null,
    id: 5294,
    imdb_id: '',
    known_for_department: 'Acting',
    name: 'Mock Person 2',
    place_of_birth: 'Forest Gate, London, England, UK',
    popularity: 2.7906,
    profile_path: '/kq5DDnqqofoRI0t6ddtRlsJnNPT.jpg',
  },
  {
    also_known_as: [],
    biography:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is mock data for development and testing purposes only.',
    birthday: '1989-07-21',
    deathday: null,
    gender: 1,
    homepage: null,
    id: 36594,
    imdb_id: '',
    known_for_department: 'Acting',
    name: 'Mock Person 3',
    place_of_birth: 'Hammersmith, London, England, UK',
    popularity: 2.1716,
    profile_path: '/ntBw3aUZmIw9ObmsmvPgk1UKMd8.jpg',
  },
  {
    also_known_as: [],
    biography:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is mock data for development and testing purposes only.',
    birthday: '1948-08-01',
    deathday: null,
    gender: 2,
    homepage: null,
    id: 7626,
    imdb_id: '',
    known_for_department: 'Production',
    name: 'Mock Person 4',
    place_of_birth: 'Givatayim, Israel',
    popularity: 2.8133,
    profile_path: '/cxmqw0anGfxC7RwUNQj3EwhX9pP.jpg',
  },
  {
    also_known_as: [],
    biography:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is mock data for development and testing purposes only.',
    birthday: '1974-01-10',
    deathday: null,
    gender: 1,
    homepage: null,
    id: 940376,
    imdb_id: '',
    known_for_department: 'Writing',
    name: 'Mock Person 5',
    place_of_birth: 'London, England, UK',
    popularity: 0.3998,
    profile_path: '/thpdVW7O1975GcA3eNs1H8UIlmd.jpg',
  },
];

export const mockPersonCreditsData: {
  cast: PersonMovieCredit[];
  crew: PersonMovieCredit[];
} = {
  cast: [
    {
      ...moviesData[0],
      department: 'Acting',
      character: 'Eddie Brock / Venom',
      job: 'Actor',
    },
    {
      ...moviesData[1],
      department: 'Acting',
      character: 'General Rex Strickland',
      job: 'Actor',
    },
    {
      ...moviesData[2],
      department: 'Acting',
      character: 'Dr. Teddy Paine',
      job: 'Actor',
    },
  ],
  crew: [
    {
      ...moviesData[3],
      department: 'Production',
      job: 'Producer',
    },
    {
      ...moviesData[4],
      department: 'Writing',
      job: 'Screenplay',
    },
    {
      ...moviesData[4],
      department: 'Directing',
      job: 'Director',
    },
  ],
};
