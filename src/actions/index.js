import Constants from '../constants'
import _ from 'lodash';

export const addMovie = (name, genre, stars, year) => ({
  type: 'ADD_MOVIE',
  id: _.uniqueId('Movie-'),
  name, genre, stars, year
})

export const filterBy = (filterString) => ({
  type: Constants.Actions.FILTER_DATA,
  filterString
})

export const sortBy = (sortKey) => ({
  type: Constants.Actions.SORT_DATA,
  sortKey
})
