import { Store } from 'interfaces';
import { AnyAction } from 'redux';
import {
  RATE_SUCCESS,
  RATE_PENDING,
  RATE_FAILED,
} from './rate.type';

const initialState: Store = {
  rate: {
    data: null,
    pending: false,
    error: null,
  },
};

const rateReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case RATE_SUCCESS:
      return {
        rate: {
          data: action['payload'],
          pending: false,
          error: null,
        },
      };
    case RATE_PENDING:
      return {
        rate: {
          data: null,
          pending: true,
          error: null,
        },
      };
    case RATE_FAILED:
      return {
        rate: {
          data: null,
          pending: false,
          error: action['payload'],
        },
      };
    default:
      return state;
  }
};

export default rateReducer;
