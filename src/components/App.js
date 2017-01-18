import React from 'react'
import AddMovie from '../containers/AddMovie'
import MovieTable from '../containers/MovieTable'

const App = () => (
    <div className="MyApp container">
      <div className="row">
          <div className="col-md-6">
              <AddMovie />
          </div>
          <div className="col-md-6">
              <MovieTable />
          </div>
      </div>
    </div>
)

export default App
