import { PersonMovieCredit } from '../movies/movies.types.service';

type PersonMovieDepartment = {
  department: string;
  movies: PersonMovieCredit[];
};

export function groupMoviesByDepartment(
  person: { knownForDepartment: string },
  credits: { cast: PersonMovieCredit[]; crew: PersonMovieCredit[] },
): PersonMovieDepartment[] {
  const departmentGroups: Record<string, PersonMovieCredit[]> = {};

  if (credits.cast && credits.cast.length > 0) {
    departmentGroups['Acting'] = [...credits.cast];
  }

  if (credits.crew && credits.crew.length > 0) {
    credits.crew.forEach((crewMember) => {
      const department = crewMember.department || 'Other';
      if (!departmentGroups[department]) {
        departmentGroups[department] = [];
      }
      departmentGroups[department].push(crewMember);
    });
  }

  Object.keys(departmentGroups).forEach((dept) => {
    departmentGroups[dept].sort((a, b) => {
      // movies with empty releaseDate (assume future releases) go first
      if (!a.releaseDate && !b.releaseDate) return 0;
      if (!a.releaseDate) return -1;
      if (!b.releaseDate) return 1;

      // then sort by release date (newest first)
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    });
  });

  const orderedDepartments: PersonMovieDepartment[] = [];

  const departmentNames = Object.keys(departmentGroups);
  const personMainDepartment = person.knownForDepartment;

  // known department first if it exists
  if (departmentGroups[personMainDepartment]) {
    orderedDepartments.push({
      department: personMainDepartment,
      movies: departmentGroups[personMainDepartment],
    });
  }

  // remaining departments in alphabetical order
  departmentNames
    .filter((department) => department !== personMainDepartment)
    .sort()
    .forEach((department) => {
      orderedDepartments.push({
        department,
        movies: departmentGroups[department],
      });
    });

  return orderedDepartments;
}
