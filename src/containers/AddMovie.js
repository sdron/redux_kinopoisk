import React, { Component } from 'react'
import _ from 'lodash';
import Promise from 'bluebird';
import { connect } from 'react-redux'
import { addMovie } from '../actions';
import MovieGenre from '../constants/MovieGenre';
import ReactStars from 'react-stars'

// todo можно в константу закинуть
const minYear = 1900;

const currentYear = new Date().getFullYear();

const DEFAULT_STATE = {
  name: '',
  genre: MovieGenre.ACTION,
  stars: null,
  error: null,
  year: currentYear
};

class AddMovie extends Component {

  constructor(props) {
    super(props);


    this.years = [];

    // фильмы могут выйти в в будующем
    let yearStart = currentYear +1;

    while(yearStart >= minYear) {
      this.years.push(yearStart--);
    }

    this.state = _.clone(DEFAULT_STATE);
  }

  handleChangeField(fieldName, ev) {
    this.setState({[fieldName]: ev.target.value});
  }

  handleRatingChanged(val) {
    this.setState({stars: val});
  }

  validate() {
    const { name, genre, stars, year } = this.state;

    return (new Promise((resolve, reject)=> {
      if(_.isEmpty(name) || _.isEmpty(genre) || _.isNull(stars) || !year) {
        reject(new Error('Заполните все поля'));
      } else {
        resolve();
      }
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, genre, stars, year} = this.state;

    this.validate()
        .then(()=> {
          this.props.dispatch(addMovie(name, genre, stars, year));
          this._clearState();
        })
        .catch((err) => {
          console.log(err);
          this.setState({ error: err.message });
        });
  }

  _clearState() {
    this.setState(_.clone(DEFAULT_STATE))
  }


  renderError() {
    const { error } = this.state;

    if(!error) {
      return null;
    }

    return <div className="errorMessage bg-danger">{error}</div>
  }

  render() {
    let input;

    const { name, genre, stars, year} = this.state;

    return (
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <fieldset>
              <legend>Добавление фильма</legend>


              <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Название фильма"
                    onChange={this.handleChangeField.bind(this, 'name')}
                    value={name}
                />
              </div>

              <div className="form-group">
                <select value={genre} onChange={this.handleChangeField.bind(this, 'genre')} className="form-control">
                  {_.map(MovieGenre.names(), (name, id) =>
                      <option key={id} value={id}>{name}</option>
                  )}
                </select>
              </div>

              <div className="form-group">
                <select value={year} onChange={this.handleChangeField.bind(this, 'year')} className="form-control">
                  {_.map(this.years, (year) =>
                      <option key={year} value={year}>{year}</option>
                  )}
                </select>
              </div>

              <div className="form-group">
                <ReactStars
                    count={5}
                    onChange={this.handleRatingChanged.bind(this)}
                    size={24}
                    half={false}
                    color2={'#ffd700'}
                    value={stars}
                />
              </div>

              {this.renderError()}
              
              <button type="submit" className="btn btn-default">Сохранить</button>
            </fieldset>
          </form>
        </div>
    )
  }
}

export default connect(addMovie)(AddMovie)