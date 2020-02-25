import { FETCH_CITY, ADD_CITY_VISITED, REMOVE_CITY_VISITED, GET_CITIES_VISITED } from '../actions/types';

const initialState = {
  items: [],
  visited: [],
  item: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CITY:
      return {
        ...state,
        items: action.payload
      };
    case ADD_CITY_VISITED:
      return {
        ...state,
        item: action.payload
      };
    case GET_CITIES_VISITED:
      return {
        ...state,
        visited: action.payload
      };
    case REMOVE_CITY_VISITED:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
