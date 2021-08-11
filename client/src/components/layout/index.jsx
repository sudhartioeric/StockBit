import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {getQueryUrl, convertDataToQuery} from '../../helpers';
import './layout.scss'



export const LayoutPage = ({children}) => {
  const [value, setValue] = useState(''),
    {search} = useLocation(),
    {push} = useHistory();

  function onSearchMovies ({key = ''}) {
    if(key === 'Enter') {
      if(!value) return push('/')
      const getQuery = (() => {
        if(!search) return `?s=${value}&page=1`;
        let query = getQueryUrl(search);
        query.s = value;
        query.page = 1;
        return convertDataToQuery(query);
      })()
      push(getQuery);
    }
  }

  useEffect(() => {
    if(search) {
      const query = getQueryUrl(search);
      if(query && query.s) setValue(query.s)
    }
  }, [search])

  return (
    <div className='container' data-testid='container'>
      <div className="container__navbar" data-testid='containerNavbar'>
        <h2 data-testid='logoStockBit' onClick={() => push('/')}>StockBit Movies</h2>


        <div className="searching-input" data-testid='searchingInput'>
          <input onChange={({target: {value}}) => setValue(value)} onKeyUp={onSearchMovies} value={value} placeholder='Search Movies...'/>
          <button data-testid='buttonSearching' onClick={() => {
            if(value) {
              setValue('');
              push('/');
              return;
            }
            onSearchMovies({key: 'Enter'})
          }}>{value ? 'Remove' : 'Search'}</button>
        </div>
      </div>

      <div data-testid='containerBody' className="container__body">
        {children}
      </div>
    </div>
  )
}