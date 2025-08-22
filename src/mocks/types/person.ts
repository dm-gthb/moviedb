export type PersonBase = {
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string | null;
};

export type PersonDetails = PersonBase & {
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  homepage: null | string;
  imdb_id: string;
  place_of_birth: string;
};
