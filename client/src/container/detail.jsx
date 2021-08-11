import {useEffect} from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {DetailMovie} from '../store/action';
import {Loading} from '../components';

export const DetailPage = () => {
  const {movieID} = useParams(),
    dispatch = useDispatch(),
    {state} = useLocation(),
    {push} = useHistory(),
    {data, loading, message} = useSelector(state => state.detailMovie);

  useEffect(() => {
    if(data.imdbID !== movieID) dispatch(DetailMovie(movieID));
  }, [data, movieID, dispatch])

  return (
    <div className='detail-container relative'>
      <button onClick={() => push(state && state.from ? state.from : '/')}>Go Back</button>
      {loading
      ? <Loading light main/>
      : message
        ? <h3 className='error-text'>{message}</h3>
        : data && data.Title
          ? <div className="detail-movie">
              <img src={data.Poster} alt={data.Title}/>

              <div className="detail-movie__information">
                <h3>{data.Title}</h3>
                <label>{data.Plot}</label>
                <p>
                  <span>Genre</span>
                  : {data.Genre}
                </p>
                <p>
                  <span>Run Time</span>
                  : {data.Runtime}
                </p>
                <p>
                  <span>Country</span>
                  : {data.Country}
                </p>
                <p>
                  <span>Director</span>
                  : {data.Director}
                </p>
                <p>
                  <span>Writers</span>
                  : {data.Writer}
                </p>
                <p>
                  <span>Actors</span>
                  : {data.Actors}
                </p>
                <p>
                  <span>Awards</span>
                  : {data.Awards}
                </p>

                <h4>Ratings</h4>
                {data.Ratings.map((rating, index) => (
                  <p key={index} className='rating'>
                    <span className='rating'>{rating.Source}</span>
                    : {rating.Value}
                  </p>
                ))}
              </div>
            </div>
          : null}
    </div>
  )
}