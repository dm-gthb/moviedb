import { MovieCredits } from '../types/movie';
import { personsData } from './persons';

export const defaultMockCredits: MovieCredits = {
  cast: [
    {
      ...personsData[0],
      cast_id: 1,
      character: 'Eddie Brock / Venom',
      credit_id: '61aecf46a242320089aafb19',
      order: 0,
    },
    {
      ...personsData[1],
      cast_id: 29,
      character: 'General Rex Strickland',
      credit_id: '64f66a30ac416100e132587b',
      order: 1,
    },
    {
      ...personsData[2],
      cast_id: 28,
      character: 'Dr. Teddy Paine',
      credit_id: '64f66a23ac41610120704484',
      order: 2,
    },
  ],
  crew: [
    {
      ...personsData[3],
      credit_id: '61d3a2a11b722c008bf4694e',
      department: 'Production',
      job: 'Producer',
    },
    {
      ...personsData[4],
      credit_id: '635bfd181b7294007bef5486',
      department: 'Writing',
      job: 'Screenplay',
    },
    {
      ...personsData[4],
      credit_id: '635bfce6fd6300007e3fef09',
      department: 'Directing',
      job: 'Director',
    },
  ],
};
export const creditsData: Record<number, MovieCredits> = {
  1: defaultMockCredits,
};
