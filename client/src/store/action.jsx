export const MOVIE_DETAIL = 'MOVIE_DETAIL'

export const DetailMovie = (movieID = '') => ({type: MOVIE_DETAIL, payload: {movieID}})