import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Middleware} from './middleware';
import {Reducers} from './reducers';

const combine = combineReducers({
  detailMovie: Reducers.MovieDetail,
})
const store = createStore(combine, {}, applyMiddleware(Middleware))

export {store}