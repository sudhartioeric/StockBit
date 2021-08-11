import {useState, Fragment, useEffect, useCallback, useMemo, useRef} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {OMDB} from '../apis';
import {Loading} from '../components';
import {handleError, getQueryUrl, convertDataToQuery} from '../helpers';

const useListMovies = () => {
  const [loading, setLoading] = useState(false),
    [message, setMessage] = useState(''),
    [movies, setMovies] = useState([]),
    [totalPages, setTotalPages] = useState(0),
    [page, setPage] = useState(1),
    {search} = useLocation(),
    hasMore = useMemo(() => {
      return page < (totalPages/10)
    }, [page, totalPages]),
    getData = useCallback(async () => {
      setLoading(true);
      setMessage('');
      await (async () => {
        try {
          let query = search ? getQueryUrl(search) : undefined,
            _page = page;
          if(query && query.s && query.page) {
            // setPage(parseInt(query.page, 10));
            _page = parseInt(query.page, 10)
          }
          const {data} = await OMDB({method: 'get', url: `${search ? `${search}&apikey=${process.env.REACT_APP_OMDB_KEY}` : `?apikey=${process.env.REACT_APP_OMDB_KEY}&s=Batman&page=${page}`}`});
          if(data && data.Response === 'True') {
            const total = parseInt(data.totalResults || '0', 10);
            if(_page === 1) {
              setMovies(data.Search);
              setTotalPages(total);
              return;
            }

            setMovies(prev => [...prev, ...data.Search]);
          }
        }catch(e) {setMessage(handleError(e))}
      })();
      setLoading(false);
    }, [page, search]);
  return {loading, hasMore, message, setPage, movies, getData}
}


export const HomePage = () => {
  const [data, setData] = useState(undefined),
    {movies, loading, setPage, message, getData, hasMore} = useListMovies(),
    observed = useRef(),
    {search} = useLocation(),
    {push} = useHistory(),
    // eslint-disable-next-line
		fetchlastest = useCallback(onHandleCallbackRefFetch, [loading, hasMore, search])

  function onHandleCallbackRefFetch (node) {
    if(loading || !hasMore) return;
    if(observed.current)
      observed.current.disconnect();
    observed.current = new IntersectionObserver(async entries => {
      if(entries[0].isIntersecting) {
        const getQuery = (() => {
          if(!search) return false;
          const query = getQueryUrl(search);
          if(query && query.page && query.s) {
            query.page = parseInt(query.page, 10) + 1;

            return convertDataToQuery(query);
          }
          return false;
        })()
        if(getQuery) return push(getQuery);
        setPage(prev => prev + 1);
      }
    })

    if(node) observed.current.observe(node);
  }

  useEffect(() => {
    getData();
  }, [getData])

  useEffect(() => {
    if(search) {
      let query = getQueryUrl(search);
      query.page = 1;
      push(convertDataToQuery(query))
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <div className="home-page-content">

        {movies && movies.length > 0
          ? movies.map((movie, index) => <ListImage key={index} data={movie} onOpen={setData}/>)
          : <h4 className='error-text'>No Data</h4>}

        {data && data.Poster && data.Title
          ? <ModalDetail data={data} close={() => setData(undefined)}/>
          : null}
      </div>

      {loading
          ? <Loading light main/>
          : movies && movies.length > 0
            ? <div className='space-refetch' ref={fetchlastest}/>
              : message
                ? <h4 className='error-text'>{message}</h4>
                : null}
    </Fragment>
  )
}

const ListImage = ({data, onOpen}) => {
  const [showTitle, setShowTitle] = useState(false),
    {push} = useHistory();

  return (
    <div className="list-item relative" onMouseEnter={() => setShowTitle(true)} onMouseLeave={() => setShowTitle(false)}>
      <img src={data.Poster} alt={data.Title} onClick={() => onOpen(data)} />

      <div className={`list-item__title ${showTitle ? 'active' : ''}`}>
        <label>{data.Title || ''}</label>
        <span>{data.Year || ''}</span>
      </div>

      <button type='button' id='but-detail' onClick={() => push(`/${data.imdbID}`)}>Detail</button>
    </div>
  )
}

const ModalDetail = ({close, data}) => (
  <div className="popup-container">
    <div className="popup-container__dismis" onClick={() => close()}/>
    <div className="popup-container__content">
      <img src={data.Poster} alt={data.Title}/>
    </div>
  </div>
)