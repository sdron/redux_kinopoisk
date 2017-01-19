import Actions from '../constants/Actions'
import _ from 'lodash';

export const addMovie = (name, genre, stars, year) => ({
  type: 'ADD_MOVIE',
  id: _.uniqueId('Movie-'),
  name, genre, stars, year
})

export const filterBy = (filterString) => ({
  type: Actions.FILTER_DATA,
  filterString
})

export const sortBy = (sortKey) => ({
  type: Actions.SORT_DATA,
  sortKey
})
