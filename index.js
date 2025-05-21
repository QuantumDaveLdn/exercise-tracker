const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { ObjectId } = require("mongodb");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const userData = {};
const userFullLogs = [];

app.post("/api/users", function(req, res) {
  const username = req.body.username;

  if (username === undefined) {
    return res.json({error: "no username present"});
  }

  const userId = new ObjectId().toString();
  userData[userId] = username;

  res.json({
    username: username,
    _id: userId
  });

});

app.post("/api/users/:_id/exercises", function(req, res) {
  try {
    const description = req.body.description;
    const dateBody = req.body.date ? new Date(req.body.date) : new Date();
    const duration = parseInt(req.body.duration);
    const userId = req.params._id;

    userFullLogs.push({
      _id: userId,
      username: userData[userId],
      date: dateBody,
      duration: duration, 
      description: description
    });

    res.json({
      _id: userId, 
      username: userData[userId],
      date: dateBody.toDateString(),
      duration: duration,
      description: description
    });
  } catch (error) {
    res.json({"error": error});
  }
});

app.get("/api/users", function(req, res) {
  if (Object.keys(userData).length === 0) {
    return res.json({"error": "Database is empty"});
  }

  const users = Object.entries(userData).map(([key, value]) => {
    return {
      _id: key,
      username: value
    }
  });

  res.json(users);
});

app.get("/api/users/:_id/logs", function(req, res) {
  const userID = req.params._id;
  if (userID === undefined) {
    return res.json({error: "User id not specified"});
  }

  const userLogs = userFullLogs.filter(user => user._id === userID);

  const { from, to, limit } = req.query;
  let filteredLogs = [...userLogs];

  if (from) {
    const fromDate = new Date(from);
    filteredLogs = filteredLogs.filter(log => log.date >= fromDate);
  } 

  if (to) {
    const toDate = new Date(to);
    filteredLogs = filteredLogs.filter(log => log.date <= toDate);
  }

  if (limit) {
    filteredLogs = filteredLogs.slice(0, parseInt(limit));
  }

  const formattedLogs = filteredLogs.map(log => ({
    description: log.description, 
    duration: log.duration,
    date: log.date.toDateString()
  }));


  res.json({
    _id: userID, 
    username: userData[userID], 
    count: formattedLogs.length,
    log: formattedLogs
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
