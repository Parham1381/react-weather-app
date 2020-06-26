import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { WeatherComponent } from './weather';
import store from '../store';

export const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <div className='content'>
            <Switch>
              <Route exact={true} path='/' component={WeatherComponent} />
              <Route render={() => <div>Page not found!</div>} />
            </Switch>
          </div>
          <div className='footer'>
            <div className="footerclass">
              Developed by Akbar Yousefi
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
};
