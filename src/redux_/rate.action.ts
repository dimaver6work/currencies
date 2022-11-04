import axios from 'axios';
import { ErrorResponse } from 'interfaces';
import {
  RATE_SUCCESS,
  RATE_PENDING,
  RATE_FAILED,
} from './rate.type';

export const getRate = (): any => {
  const pending = () => ({
    type: RATE_PENDING,
  });
  const success = (data: any) => ({
    type: RATE_SUCCESS,
    payload: data,
  });
  const failure = (error: ErrorResponse) => ({
    type: RATE_FAILED,
    payload: error,
  });
  return async (dispatch: any) => {
    dispatch(pending());
    const { data, error } = await axios.get<any, any>(
      'https://cdn.cur.su/api/latest.json'
    );

    if (data) {
      dispatch(success(data));
      return { data, error: null };
    }
    dispatch(failure(error));
    return { data: null, error };
  };
};
