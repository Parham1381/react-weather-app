import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { WeatherMain } from './weather-main';
import store from '../store';

export const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <div className='content'>
            <Switch>
              <Route exact={true} path='/' component={WeatherMain} />
              <Route render={() => <div>Page not found!</div>} />
            </Switch>
          </div>
          <footer className='footer'>Developed by Akbar Yousefi</footer>
        </div>
      </Router>
    </Provider>
  );
};
