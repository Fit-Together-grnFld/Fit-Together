var mongoose = require('mongoose');
mongoose.connect('mongodb://user:access1@ds151612.mlab.com:51612/fit-together');
var db = mongoose.connection;
db.on('error', function() {
  console.log('mongoose connection error');
});
db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  name: String,
  password: String,
  image: String,
  phone: Number,
  email: String,
  zip: Number,
  interests: Array,
  events: Array
});
var gameSchema = mongoose.Schema({
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
  time: String
});
var interestSchema = mongoose.Schema({
  interest: String
});
var messageSchema = mongoose.Schema({
  user: String,
  game: String,
  body: String
});

var Interest = mongoose.model('Interest', interestSchema, 'interests');
var Game = mongoose.model('Game', gameSchema, 'games');
var Message = mongoose.model('Message', messageSchema, 'messages');
var User = mongoose.model('User', userSchema, 'users');


module.exports.db = db;
module.exports.User = User;
module.exports.Interest = Interest;
module.exports.Game = Game;
module.exports.Message = Message;