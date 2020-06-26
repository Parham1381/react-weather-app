const express = require('express');
const http = require('http');
const app = express();
const port = 3000;

const apiKey = require('./constants/api-key.json');
//const weatherApiMoq = require('./mock/weather-api-moq');
const corsHeader = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(corsHeader);

app.get('/getWeather', (req, res) => {
    var city = req.query.city || '';
    if(!city.length) {
      res.status(404).json({'msg': 'Invalid city name in query string'});
      res.end();
      return;
    }

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey.openWeatherMap}`;
    var request = http.get(apiUrl, function(response) {
      var buffer = '', data;

      response.on('data', function (chunk) {
          buffer += chunk;
      }); 

      response.on('end', function (err) {
          if (!err) {
            // dump the data
            // console.log(buffer);
            
            res.end(buffer);
          } else {
            console.log('an error happened!');
            console.dir(err);
          }
      }); 
    });
    
    request.on('error', function(err) {
      console.log(err);
      res.status(500).json({'msg': err});
      res.end();
      return;
    });
    
    return; 
   //setTimeout(() => res.send(weatherApiMoq), 1000);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
