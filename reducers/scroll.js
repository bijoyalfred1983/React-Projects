/* @flow */
import type { Scroll, Action } from '../types';

type State = Scroll;

const initialState = {
  scrollY: 0,
  scrollX: 0
};

const appData = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SCROLL':
      return { ...state, scrollY: action.Y, scrollX: action.X };
    default:
      return state;
  }
};
export default appData;
