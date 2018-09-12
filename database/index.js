/*eslint-disable*/
const mongoose = require('mongoose');

mongoose.connect('mongodb://user:access1@ds151612.mlab.com:51612/fit-together');
const db = mongoose.connection;
db.on('error', () => {
  console.log('mongoose connection error');
});
db.once('open', () => {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  image: String,
  phone: Number,
  email: String,
  zip: Number,
  interests: Array,
  events: Array,
});
const gameSchema = mongoose.Schema({
  name: String,
  type: String,
  description: String,
  street: String,
  city: String,
  state: String,
  zip: Number,
  creator: String,
  players: Array,
  date: Date,
  time: String,
});
const interestSchema = mongoose.Schema({
  interest: String,
});
const messageSchema = mongoose.Schema({
  user: String,
  game: String,
  body: String,
});

const Interest = mongoose.model('Interest', interestSchema, 'interests');
const Game = mongoose.model('Game', gameSchema, 'games');
const Message = mongoose.model('Message', messageSchema, 'messages');
const User = mongoose.model('User', userSchema, 'users');


module.exports.db = db;
module.exports.User = User;
module.exports.Interest = Interest;
module.exports.Game = Game;
module.exports.Message = Message;
