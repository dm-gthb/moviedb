export type PersonBase = {
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  popularity: number;
  profilePath: string | null;
};

export type PersonDetails = PersonBase & {
  alsoKnownsAs: string[];
  biography: string;
  birthday: string;
  deathday: string;
  homepage: null | string;
  imdbId: string;
  placeOfBirth: string;
};
