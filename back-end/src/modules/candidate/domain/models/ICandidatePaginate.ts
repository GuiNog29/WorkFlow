import { ICandidate } from './ICandidate';

export interface ICandidatePaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: ICandidate[];
}
