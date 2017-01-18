import movies from './movies'

describe('movies reducer', () => {
  it('should handle initial state', () => {
    expect(
        movies(undefined, {})
    ).toEqual([])
  })

  it('should handle ADD_MOVIE', () => {
    expect(
        movies([], {
        type: 'ADD_MOVIE',
        name: 'Run the tests',
        id: 0
      })
    ).toEqual([
      {
        name: 'Run the tests',
        id: 0
      }
    ])

    expect(
        movies([
        {
          name: 'Run the tests',
          id: 0
        }
      ], {
        type: 'ADD_MOVIE',
        name: 'Use Redux',
        id: 1
      })
    ).toEqual([
      {
        name: 'Run the tests',
        id: 0
      }, {
        name: 'Use Redux',
        id: 1
      }
    ])

    expect(
        movies([
        {
          name: 'Run the tests',
          id: 0
        }, {
          name: 'Use Redux',
          id: 1
        }
      ], {
        type: 'ADD_MOVIE',
        name: 'Fix the tests',
        id: 2
      })
    ).toEqual([
      {
        name: 'Run the tests',
        id: 0
      }, {
        name: 'Use Redux',
        id: 1
      }, {
        name: 'Fix the tests',
        id: 2
      }
    ])
  })

})
