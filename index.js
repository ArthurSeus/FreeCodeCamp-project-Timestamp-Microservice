// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date_string?', (req, res) => {
  const date = req.params.date_string;
  const returnData = {
    "unix": null,
    "utc": null
  }

  let desiredDate;
  
  if(!date){
    // if no date is passed then use the current
    desiredDate = new Date();
  } else {
    desiredDate = new Date(date);
    let isValidDate = desiredDate.getTime();
    //check if it parses correctly everything -unix format
    if(!isValidDate && isValidDate !== 0){
    //if not valid, then try unix format
    desiredDate = new Date(+date);
    isValidDate = desiredDate.getTime();
    if(!isValidDate && isValidDate !== 0)
      //if still not valid then it is not a valid date
      res.json({ error : "Invalid Date" });
    }
  }

  returnData["unix"] = desiredDate.getTime();
  returnData["utc"] = desiredDate.toUTCString();
  
  console.log(returnData);
  res.json(returnData)
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
