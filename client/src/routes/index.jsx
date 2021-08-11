import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {HomePage, DetailPage} from '../container';
import {LayoutPage} from '../components';

export const App = () => (
  <Router>
    <Switch>
      <LayoutPage>
        <Route path='/' exact component={HomePage}/>
        <Route path='/:movieID' component={DetailPage}/>
      </LayoutPage>
    </Switch>
  </Router>
)