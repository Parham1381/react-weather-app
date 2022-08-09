const express = require('express');
//const http = require('http');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = 3000;

app.post('/users', (req, res) => {
  console.log(req.body);
    const {fullName, email, age, title, password, token, registrationTimestamp} = req.body;

    const errors = [];
    if (fullName == null || fullName.length === 0) {
      errors.push({message: '"fullName" is required'});
    } else if (fullName.length > 128) {
      errors.push({message: '"fullName" length must be less than or equal to 128 characters long'});
    }

    if (email == null || email.length === 0) {
      errors.push({message: '"email" is required'});
    } 

    if (age == null ) {
      errors.push({message: '"age" is required'});
    } else if (+age <= 18) {
      errors.push({message: '"age" must be larger than or equal to 18'});
    } else if (+age >= 100) {
      errors.push({message: '"age" must be less than or equal to 100'});
    }

    if (!!title && !['Mr.','Mrs.','Ms.','N/A'].includes(title)) {
      errors.push({message: '"title" must be one of [Mr., Mrs., Ms., N/A]'});
    }

    if (!!password && !!token) {
      errors.push({message: 'either password or token must be present'});
    } else if (!!password) {
      if (typeof password !== 'string') {
        errors.push({message: '"password" must be a string'});
      }
    } else if (!!token) {
      if (typeof token !== 'string') {
        errors.push({message: 'token must be a string'});
      }
    }

    // errors.push({message: ''});

    if (errors.length) {
      res.status(422).json({'statusCode': 422, errors: errors});
      res.end();
    } else {
      res.send(201);
    }

    return;

});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
