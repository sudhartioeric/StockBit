import {MOVIE_DETAIL} from './action';

const initialDetailMovie = {
  data: {
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: "",
    Country: "",
    Awards: "",
    Poster: "",
    Ratings: [],
    Metascore: "",
    imdbRating: "",
    imdbVotes: "",
    imdbID: "",
    Type: "",
    DVD: "",
    BoxOffice: "",
    Production: "",
    Website: "",
    Response: ""
  },
  message: '',
  loading: false
}

const MovieDetail = (state = initialDetailMovie, action = {type: '', payload: undefined}) => {
  switch (action.type) {
    case `${MOVIE_DETAIL}_LOADING`:
      return {...state, loading: true};
    case `${MOVIE_DETAIL}_SUCCESS`:
      return {...state, loading: false, message: '', data: action.payload};
    case `${MOVIE_DETAIL}_ERROR`:
      return {...state, loading: false, message: action.payload.message};
    default:
      return state;
  }
}

export const Reducers = {
  MovieDetail
}