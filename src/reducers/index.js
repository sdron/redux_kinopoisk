import { combineReducers } from 'redux'
import movies from './movies'
import tableFilter from './tableFilter'

const movieApp = combineReducers({
  movies,
  tableFilter
})

export default movieApp
