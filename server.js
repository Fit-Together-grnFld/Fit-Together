const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/helper.js');
// const port = process.env.PORT || 3000;
const app = express()
const proxy = require('express-http-proxy');


// app.use('/proxy', proxy('http://localhost:8080'));
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.static('client'));

//ADD USER
app.post('signup', (req, res) => {
  db.getUserByName([USERNAME], (user) => {
    if(user){
      res.send('There is already a user with that name');
    } else {
      db.addUser([USERNAME], [PASSWORD], [IMGPATH], [PHONE], [EMAIL], [ZIP])
      res.send('User added to database');
    }
  })
})

//ADD GAME
app.post('/createGame', (req, res) => {
  db.getGameByName([GAMENAME], (game) => {
    if(game){
      res.send('There is already an event with that name')
    } else {
      db.addGame([GAMENAME], [TYPE], [DESCRIPTION], [STREET], [CITY], [STATE], [ZIP], [CREATOR], [DATE], [TIME]);
      res.send('Game saved to database')
    }
  })
})

//ADD PLAYER TO GAME
app.post('/joinGame', (req, res) => {
  db.getPlayerFromGame([USERNAME], [GAMENAME], (player) => {
    if(player){
      res.send('You are already signed up for this event')
    } else {
      db.addPlayerToGame([USERNAME], [GAMENAME]);
      res.send('You have expressed interest')
    }
  })
})

app.post('/add', (req, res) => {
  console.log('posted');
  db.addPlayerToGame('Kenneth', 'pickup sticks');
})
app.post('/messageCornelius', (req, res) => {
  db.addMessage('Cornelius', 'three on three', 'We gonna get it')
})

app.post('/messageKenneth', (req, res) => {
  db.addMessage('Kenneth', 'three on three', 'You dont even know')
})

//TEST get all games for user kenneth
app.get('/userGames', (req, res) => {
  db.getGamesForUser('Kenneth', (games) => {
    res.send(games);
  })
})
//TEST get a game by it's name
app.get('/game', (req,res) => {
  db.getGameByName('three on three', (game) => {
    res.send(game);
  })
})
//TEST get all messages for a game
app.get('/messages', (req, res) => {
  db.getGameMessages('three on three', (messages) => {
    res.send(messages);
  })
})

app.get('/userCole', (req, res) => {
  db.getUserByName('Cole', (user) => {
    if(user){
      res.send(user);
    } else {
      res.send('No such user');
    }
  })
})
module.exports = app;