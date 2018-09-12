const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/helper.js');
// const port = process.env.PORT || 3000;
const app = express()
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.static('client'));

app.post('/user', (req, res) => {
  console.log('posted');
  db.addUser('Kenneth','Kenneth','kenneth.jpg',9859859859,'Kenneth@ken.neth',70019);
  db.addUser('Cornelius','Cornelius','cornelius.jpg',5045045045,'Cornelius@ken.neth',70002);  
})

app.post('/game', (req, res) => {
  console.log('posted');
  db.addGame('pickup sticks', 'extreme sports', 'gonna rock your socks off', '123 almonaster', 'new orleans', 'la', 70170, 'cornelius', 3/13/2019, 1);
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

//TEST add Kenneth and Cornelius 
app.post('/corn', (req, res) => {
  console.log('cornelius added')
  db.addUser('Cornelius', 'Scarlet', 'token.jpg', 5046154481, 'cornelius@cornel.ius', 70002);
  console.log('kenneth added');
  db.addUser('Kenneth', 'Caitlin', 'token.jpg', 9857700249, 'Kenneth@kenn.eth', 70119);
})
//TEST add basketball game
app.post('/ball', (req, res) => {
  console.log('game added');
  db.addGame('three on three', 'team sports', 'pickup game', '124 Almonaster', 'New Orleans', 'LA', 70125, 'Kenneth', 13032019, 1)
})
//TEST kenneth joins the game
app.post('/join', (req, res) => {
  console.log('kenneth is joining');
  db.addPlayerToGame('Kenneth', 'three on three');
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

app.get('/userKenneth', (req, res) => {
  db.getUserByName('kenneth', (user) => {
    res.send(user);
  })
})
module.exports = app;