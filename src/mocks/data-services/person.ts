import { mockPersonCreditsData, personsData } from '../data/persons';
import { PersonDetails } from '../types/person';
import { PersonMovieCredit } from '../types/movie';

let personCredits = { ...mockPersonCreditsData };
let persons: PersonDetails[] = personsData;

export async function read(personId: number): Promise<PersonDetails | undefined> {
  return persons.find((person) => person.id === personId);
}

export async function readCredits(
  personId: number,
): Promise<{ cast: PersonMovieCredit[]; crew: PersonMovieCredit[] } | undefined> {
  console.log(`mock personCredits for ${personId}`);
  return personCredits;
}

export async function create(person: PersonDetails) {
  persons.push(person);
}

export async function createCredits(credits: {
  cast: PersonMovieCredit[];
  crew: PersonMovieCredit[];
}) {
  personCredits = credits;
}

export async function reset() {
  personCredits = { cast: [], crew: [] };
  persons = [];
}
