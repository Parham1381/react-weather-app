import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { WeatherMain } from './weather-main';
import store from '../store';
export var App = function () {
    return (React.createElement(Provider, { store: store },
        React.createElement(Router, null,
            React.createElement("div", null,
                React.createElement("div", { className: 'content' },
                    React.createElement(Switch, null,
                        React.createElement(Route, { exact: true, path: '/', component: WeatherMain }),
                        React.createElement(Route, { render: function () { return React.createElement("div", null, "Page not found!"); } }))),
                React.createElement("footer", { className: 'footer' }, "Developed by Akbar Yousefi")))));
};
//# sourceMappingURL=app.js.map