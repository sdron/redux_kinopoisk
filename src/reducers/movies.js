const LOCAL_STORAGE_KEY = 'movies';

// todo нужно обернуть на проверку активности локального хранилища и чтобы не заморачиваться с джейсонами
const items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

const movie = (state, action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return {
        id: action.id,
        name: action.name,
        stars: action.stars,
        year: action.year,
        genre: action.genre
      }
    default:
      return state
  }
}

const movies = (state = items || [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
        const movies = [
          ...state,
          movie(undefined, action)
        ];
        console.info(JSON.stringify(movies));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
      return movies;
    default:
      return state
  }
}

export default movies
