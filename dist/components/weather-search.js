import * as React from 'react';
import Button from 'react-bootstrap/Button';
export var WeatherSearch = function (props) {
    var _a = React.useState(''), location = _a[0], setLocation = _a[1];
    var handleChange = function (event) {
        var value = event.target.value;
        // console.log(value);
        setLocation(value);
    };
    var handleSubmit = function () {
        // e.preventDefault();
        props.onSearch(location);
    };
    return (React.createElement("div", { className: "w-50 mx-auto p-2 wrapper container" },
        React.createElement("form", { onSubmit: handleSubmit, className: "form-inline justify-content-center" },
            React.createElement("div", { className: "input-group w-100" },
                React.createElement("input", { className: "form-control rounded m-1", style: { fontSize: "1.2em" }, placeholder: "City", onChange: handleChange, type: "text" }),
                React.createElement(Button, { type: 'submit', variant: 'primary', size: 'lg', className: " btn btn-lg bg-transparent fa fa-search text-light", style: { fontSize: "1.5em", border: "0px" } })))));
};
//# sourceMappingURL=weather-search.js.map