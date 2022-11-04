import { Rate } from 'interfaces';

export interface Store {
  rate: CommonRedux<Rate>;
}

export interface CommonRedux<D = any> {
  data: D | null;
  error: ErrorResponse | null;
  pending: boolean;
}

export interface ErrorResponse<E = any> {
  status: number;
  statusText: string;
  payload?: E | ErrorPayload;
}

export interface ErrorPayload {
  error: string;
}
