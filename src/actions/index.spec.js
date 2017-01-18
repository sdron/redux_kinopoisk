import * as actions from './index'

describe('movie actions', () => {
  it('addMovie should create ADD_MOVIE action', () => {
    expect(actions.addMovie('Use Redux')).toEqual({
      type: 'ADD_MOVIE',
      id: 0,
      name: 'Use Redux'
    })
  })
})
