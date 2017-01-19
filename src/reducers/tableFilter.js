import Actions from '../constants/Actions'

const defaultVal = {
  filterString: '',
  sortDesc: false,
  sortKey: 'name'
};

const tableFilter = (state = defaultVal, action) => {
  switch (action.type) {
    case Actions.FILTER_DATA:
      return {
        ...state,
        filterString: action.filterString.toLowerCase()
      }
    case Actions.SORT_DATA:
      return {
        ...state,
        sortKey: action.sortKey,
        sortDesc: state.sortKey === action.sortKey ? !state.sortDesc : false
      }
    default:
      return state
  }
}

export default tableFilter
