import React from 'react'
import Constants from '../constants';
import ReactStars from 'react-stars'
import _ from  'lodash'

// Stateless cell components for Table component
function SortHeaderCell ({name, sortBy, sortKey, sortDesc, columnKey}) {
  const clickFunc = () => sortBy(columnKey)

  return (
    <td onClick={clickFunc}>
        {name} {sortKey === columnKey ? (sortDesc ? '↓' : '↑') : ''}
    </td>
  )
}

SortHeaderCell.propTypes = {
  sortBy: React.PropTypes.func.isRequired,
  sortKey: React.PropTypes.string.isRequired,
  sortDesc: React.PropTypes.bool.isRequired,
  columnKey: React.PropTypes.string,
  name: React.PropTypes.string.isRequired
}

class AppTable extends React.Component {

  handleFilterStringChange () {
    return (e) => {
      e.preventDefault()
      this.props.filterBy(e.target.value)
    }
  }

  doesMatch (str, key, name) {
    // поиск по жанру
    if(name === 'genre') {
      key = Constants.MovieGenre.translate(key);
    }
    return key.toString().toLowerCase().indexOf(str) !== -1
  }

  filterData () {
    const {data, filterString} = this.props
    const str = filterString.toLowerCase()

    return str !== ''
        ? data.filter((r) => _.some(r, this.doesMatch.bind(this, str)))
        : data
  }

  sortData () {
    const {data, sortKey, sortDesc} = this.props
    const multiplier = sortDesc ? -1 : 1
    data.sort((a, b) => {
      const aVal = a[sortKey] || 0
      const bVal = b[sortKey] || 0
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0)
    })
    return this
  }

  renderTable(data) {
    return (
        <table className="movieTable table">
          <thead>
          <tr>
            <SortHeaderCell
                name="Название"
                columnKey="name"
                {...this.props}
            />
            <SortHeaderCell
                name="Жанр"
                columnKey="genre"
                {...this.props}
            />
            <SortHeaderCell
                name="Год"
                columnKey="year"
                {...this.props}
            />
            <SortHeaderCell
                name="Оценка"
                columnKey="stars"
                {...this.props}
            />
          </tr>
          </thead>
          <tbody>
          {data.map((movie, index) =>
              <tr key={index}>
                <td>
                  {movie.name}
                </td>
                <td>
                  {Constants.MovieGenre.translate(movie.genre)}
                </td>
                <td>
                  {movie.year}
                </td>
                <td>
                  <ReactStars
                      count={5}
                      size={16}
                      half={false}
                      color2={'#ffd700'}
                      value={movie.stars}
                      edit={false}
                  />
                </td>
              </tr>
          )}
          </tbody>
        </table>
    )
  }

  render () {
    const { filterString } = this.props;

    const data = this.sortData().filterData();

    return (
      <div>
        <input className="form-control" value={filterString}
          onChange={this.handleFilterStringChange()}
          type='text' placeholder='Поиск'
          autoCorrect='off' autoCapitalize='off' spellCheck='false' />
        <br />
        {
           data.length === 0 ? (<h3 className='center'>Нет данных :( </h3>) : this.renderTable(data)
        }
      </div>
    )
  }
}

AppTable.propTypes = {
  // actions
  sortBy: React.PropTypes.func.isRequired,
  filterBy: React.PropTypes.func.isRequired,

  // state data
  data: React.PropTypes.array.isRequired,
  filterString: React.PropTypes.string.isRequired,
  sortKey: React.PropTypes.string.isRequired,
  sortDesc: React.PropTypes.bool.isRequired
}

export default AppTable
