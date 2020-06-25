import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { NavBar } from '../components/nav-bar';
import { WeatherMain } from './weather-main';
import { WeatherMap } from './weather-map';
import store from '../store';

export const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          {/*<NavBar />*/}
          <div className='content'>
            <Switch>
              <Route exact={true} path='/' component={WeatherMain} />
              <Route path='/map' component={WeatherMap} />
              <Route render={() => <div>Page not found!</div>} />
            </Switch>
          </div>
          <footer className='footer'>Developed by Akbar Yousefi</footer>
        </div>
      </Router>
    </Provider>
  );
};
