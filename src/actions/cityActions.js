import { FETCH_CITY,ADD_CITY_VISITED,REMOVE_CITY_VISITED,GET_CITIES_VISITED } from './types';
import axios from 'axios';

export const fetchCities = () => dispatch => {  
  fetch('http://localhost:5000/city/get-cities')
  .then(res => res.json())
  .then(result => {
    dispatch({
      type: FETCH_CITY,
      payload: result
    })
  });
};

export const fetchCitiesVisited = () => dispatch => {  
  fetch('http://localhost:5000/cityVisited/get-city-visited')
  .then(res => res.json())
  .then(result => {
    dispatch({
      type: GET_CITIES_VISITED,
      payload: result
    })
  });
};

export const addCityVisited = (data) => dispatch => {
  axios
  .post('http://localhost:5000/cityVisited/add-city-visited', {
    headers: { 'Access-Control-Allow-Headers': '*' },
    body: JSON.stringify(data)
  })
  .then(res => {
    dispatch({
      type: ADD_CITY_VISITED,
      payload: res.data
    })
  });
 
};

export const deleteCityVisited = (id) => dispatch => {
  axios
  .delete('http://localhost:5000/cityVisited/delete-city-visited', {
    data: {
      headers: { 'Access-Control-Allow-Headers': '*' },
      id: id
    }
  })
  .then(res => {
    fetch('http://localhost:5000/cityVisited/get-city-visited')
    .then(res => res.json())
    .then(result => {
      dispatch({
        type: REMOVE_CITY_VISITED,
        payload: result
      })
    });
  })
};