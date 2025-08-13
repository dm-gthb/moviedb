import { describe, it, expect } from 'vitest';
import { groupMoviesByDepartment } from './person-movies.categorize.service';
import {
  buildPersonMovieCreditClient,
  buildPersonDataClient,
  buildPersonMovieCreditsClient,
} from '../../mocks/generate';

describe('groupMoviesByDepartment', () => {
  describe('base', () => {
    it('should group cast movies under Acting department', () => {
      const person = buildPersonDataClient({ knownForDepartment: 'Acting' });
      const movieA = buildPersonMovieCreditClient({
        title: 'Movie A',
        releaseDate: '2023-01-01',
      });
      const movieB = buildPersonMovieCreditClient({
        title: 'Movie B',
        releaseDate: '2022-01-01',
      });
      const credits = buildPersonMovieCreditsClient({
        cast: [movieA, movieB],
      });

      const result = groupMoviesByDepartment(person, credits);

      expect(result).toHaveLength(1);
      expect(result[0].department).toBe('Acting');
      expect(result[0].movies).toHaveLength(2);
      expect(result[0].movies[0].title).toBe('Movie A'); // Newer first
      expect(result[0].movies[1].title).toBe('Movie B');
    });

    it('should group crew movies by their department', () => {
      const person = buildPersonDataClient({ knownForDepartment: 'Directing' });
      const movieA = buildPersonMovieCreditClient({
        title: 'Movie A',
        releaseDate: '2023-01-01',
        department: 'Directing',
      });
      const movieB = buildPersonMovieCreditClient({
        title: 'Movie B',
        releaseDate: '2022-01-01',
        department: 'Writing',
      });
      const movieC = buildPersonMovieCreditClient({
        title: 'Movie C',
        releaseDate: '2021-01-01',
        department: 'Directing',
      });
      const credits = buildPersonMovieCreditsClient({
        crew: [movieA, movieB, movieC],
      });

      const result = groupMoviesByDepartment(person, credits);

      expect(result).toHaveLength(2);

      // Directing department should be first (person's known department)
      expect(result[0].department).toBe('Directing');
      expect(result[0].movies).toHaveLength(2);
      expect(result[0].movies[0].title).toBe('Movie A'); // Newer first
      expect(result[0].movies[1].title).toBe('Movie C');

      // Writing department should be second (alphabetical order)
      expect(result[1].department).toBe('Writing');
      expect(result[1].movies).toHaveLength(1);
      expect(result[1].movies[0].title).toBe('Movie B');
    });

    it('should handle mixed cast and crew movies', () => {
      const person = buildPersonDataClient({ knownForDepartment: 'Acting' });
      const actingMovie = buildPersonMovieCreditClient();
      const directingMovie = buildPersonMovieCreditClient({
        department: 'Directing',
      });
      const writingMovie = buildPersonMovieCreditClient({
        department: 'Writing',
      });
      const credits = buildPersonMovieCreditsClient({
        cast: [actingMovie],
        crew: [directingMovie, writingMovie],
      });

      const result = groupMoviesByDepartment(person, credits);

      expect(result).toHaveLength(3);
      expect(result[0].department).toBe('Acting'); // Person's known department first
      expect(result[1].department).toBe('Directing'); // Alphabetical order
      expect(result[2].department).toBe('Writing');
    });
  });

  describe('sorting', () => {
    it('should sort movies by release date (newest first) within each department', () => {
      const person = buildPersonDataClient({ knownForDepartment: 'Acting' });
      const oldMovie = buildPersonMovieCreditClient({
        title: 'Old Movie',
        releaseDate: '2020-01-01',
      });
      const newMovie = buildPersonMovieCreditClient({
        title: 'New Movie',
        releaseDate: '2023-01-01',
      });
      const middleMovie = buildPersonMovieCreditClient({
        title: 'Middle Movie',
        releaseDate: '2021-01-01',
      });
      const credits = buildPersonMovieCreditsClient({
        cast: [oldMovie, newMovie, middleMovie],
      });

      const result = groupMoviesByDepartment(person, credits);

      expect(result[0].movies.map((m) => m.title)).toEqual([
        'New Movie', // 2023
        'Middle Movie', // 2021
        'Old Movie', // 2020
      ]);
    });

    it('should place movies with empty release date first (future releases)', () => {
      const person = buildPersonDataClient({ knownForDepartment: 'Acting' });
      const releasedMovie = buildPersonMovieCreditClient({
        title: 'Released Movie',
        releaseDate: '2023-01-01',
      });
      const futureMovieA = buildPersonMovieCreditClient({
        title: 'Future Movie A',
        releaseDate: '',
      });
      const oldMovie = buildPersonMovieCreditClient({
        title: 'Old Movie',
        releaseDate: '2020-01-01',
      });
      const futureMovieB = buildPersonMovieCreditClient({
        title: 'Future Movie B',
        releaseDate: '',
      });
      const credits = buildPersonMovieCreditsClient({
        cast: [releasedMovie, futureMovieA, oldMovie, futureMovieB],
      });

      const result = groupMoviesByDepartment(person, credits);

      const titles = result[0].movies.map((m) => m.title);
      expect(titles.slice(0, 2)).toEqual(['Future Movie A', 'Future Movie B']);
      expect(titles.slice(2)).toEqual(['Released Movie', 'Old Movie']);
    });
  });

  describe('department ordering', () => {
    describe('should place person known department first', () => {
      const testCases = [
        {
          knownFor: 'Acting',
          expectedOrder: ['Acting', 'Directing', 'Writing'],
        },
        {
          knownFor: 'Directing',
          expectedOrder: ['Directing', 'Acting', 'Writing'],
        },
        {
          knownFor: 'Writing',
          expectedOrder: ['Writing', 'Acting', 'Directing'],
        },
      ];

      testCases.forEach(({ knownFor, expectedOrder }) => {
        it(`when person is known for ${knownFor}`, () => {
          const person = buildPersonDataClient({ knownForDepartment: knownFor });
          const actingMovie = buildPersonMovieCreditClient();
          const directingMovie = buildPersonMovieCreditClient({
            department: 'Directing',
          });
          const writingMovie = buildPersonMovieCreditClient({
            department: 'Writing',
          });
          const credits = buildPersonMovieCreditsClient({
            cast: [actingMovie],
            crew: [directingMovie, writingMovie],
          });

          const result = groupMoviesByDepartment(person, credits);

          expect(result.map((r) => r.department)).toEqual(expectedOrder);
        });
      });
    });

    describe('alphabetical sorting of remaining departments', () => {
      it('should place person known department first, then sort remaining alphabetically', () => {
        const person = buildPersonDataClient({ knownForDepartment: 'Production' });
        const writingMovie = buildPersonMovieCreditClient({
          department: 'Writing',
        });
        const artMovie = buildPersonMovieCreditClient({
          department: 'Art',
        });
        const directingMovie = buildPersonMovieCreditClient({
          department: 'Directing',
        });
        const productionMovie = buildPersonMovieCreditClient({
          department: 'Production',
        });
        const credits = buildPersonMovieCreditsClient({
          crew: [writingMovie, artMovie, directingMovie, productionMovie],
        });

        const result = groupMoviesByDepartment(person, credits);

        expect(result.map((r) => r.department)).toEqual([
          'Production',
          'Art',
          'Directing',
          'Writing',
        ]);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty cast and crew arrays', () => {
      const person = buildPersonDataClient({ knownForDepartment: 'Acting' });
      const credits = buildPersonMovieCreditsClient();

      const result = groupMoviesByDepartment(person, credits);

      expect(result).toEqual([]);
    });

    it('should handle crew movies with undefined department', () => {
      const person = buildPersonDataClient({ knownForDepartment: 'Acting' });
      const unknownDeptMovie = buildPersonMovieCreditClient({
        department: undefined,
      });
      const credits = buildPersonMovieCreditsClient({
        crew: [unknownDeptMovie],
      });

      const result = groupMoviesByDepartment(person, credits);

      expect(result).toHaveLength(1);
      expect(result[0].department).toBe('Other');
      expect(result[0].movies).toHaveLength(1);
    });

    it('should handle person known department that does not exist in credits', () => {
      const person = buildPersonDataClient({
        knownForDepartment: 'NonExistentDepartment',
      });
      const actingMovie = buildPersonMovieCreditClient();
      const writingMovie = buildPersonMovieCreditClient({
        department: 'Writing',
      });
      const credits = buildPersonMovieCreditsClient({
        cast: [actingMovie],
        crew: [writingMovie],
      });

      const result = groupMoviesByDepartment(person, credits);

      expect(result).toHaveLength(2);
      expect(result.map((r) => r.department)).toEqual(['Acting', 'Writing']);
    });

    it('should handle invalid release dates gracefully', () => {
      const person = buildPersonDataClient({ knownForDepartment: 'Acting' });
      const validDateMovie = buildPersonMovieCreditClient({
        title: 'Valid Date',
        releaseDate: '2023-01-01',
      });
      const invalidDateMovie = buildPersonMovieCreditClient({
        title: 'Invalid Date',
        releaseDate: 'invalid-date',
      });
      const emptyDateMovie = buildPersonMovieCreditClient({
        title: 'Empty Date',
        releaseDate: '',
      });
      const credits = buildPersonMovieCreditsClient({
        cast: [validDateMovie, invalidDateMovie, emptyDateMovie],
      });

      const result = groupMoviesByDepartment(person, credits);

      expect(result[0].movies).toHaveLength(3);
      expect(result[0].movies[0].title).toBe('Empty Date'); // Empty dates first
      expect(result[0].movies[1].title).toBe('Valid Date'); // Then valid dates
      expect(result[0].movies[2].title).toBe('Invalid Date'); // Invalid dates treated as old
    });
  });
});
