import {OMDB} from '../apis';
import {handleError} from '../helpers';
import {MOVIE_DETAIL} from './action';

export const Middleware = store => next => (action = {type: '', payload: undefined}) => {
  switch (action.type) {
    case MOVIE_DETAIL:
      next({type: `${action.type}_LOADING`, payload: null});
      OMDB({method: 'GET', url: `?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${action.payload.movieID}`})
        .then(({data}) => next({type: `${action.type}_SUCCESS`, payload: data}))
        .catch(e => {
          const message = handleError(e);
          next({type: `${action.type}_ERROR`, payload: {message}})
        })
      break;
    default:
      return next(action)
  }
}