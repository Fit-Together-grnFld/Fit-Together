const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/helper.js');
const bcrypt = require('bcrypt');
const app = express()
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.static('client'));

//ADD USER
app.post('/signup', (req, res) => {
  db.getUserByName([USERNAME], (user) => {
    if(user){
      res.send('There is already a user with that name');
    } else {
      bcrypt.hash([PASSWORD], 10, function(err, hash) {
        // Store hash in your password DB.
        if(err){
          console.log(err);
        } else {
          db.addUser([USERNAME], hash, [IMGPATH], [PHONE], [EMAIL], [ZIP])
          res.send('User added to database');
        }
      });
      
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

//LOGIN
app.get('/login', (req, res) => {
  let inputPassword;
  bcrypt.hash([PASSWORD], 10, function(err, hash) {
    // Store hash in your password DB.
    if(err){
      console.log(err);
    } else {
      inputPassword = hash;
    }
  })
  .then(db.getPasswordFromUser([USERNAME], (pass) => {
    bcrypt.compare(pass, hash, function(err, res) {
      if(err){
        console.log(err)
      } else {
        res.render([HOMEPAGE]);
      }
    });
  }))
})

//SEND A MESSAGE
app.post('/message', (req, res) => {
  db.addMessage([USERNAME], [GAME], [MESSAGEBODY])
})

//GET ALL INFO FOR ONE USER
app.get('/user', (req, res) => {
  db.getUserByName([USERNAME], (err, user) => {
    if(err){
      console.log(err)
    } else {
      console.log('User Found')
      res.send(user);
    }
  })
})

//GET ALL INFO ON A GAME
app.get('/game', (req, res) => {
  db.getGameByName([GAMENAME], (err, game) => {
    if(err){
      console.log(err)
    } else {
      console.log('Game Found');
      res.send(game);
    }
  })
})

//TEST incoming data
app.get('/test', (req, res) => {
  if(err){
    console.log(err)
  } else {
    res.send('success!');
  }
})

module.exports = app;