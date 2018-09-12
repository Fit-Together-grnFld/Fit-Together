/*eslint-disable*/
const { User, Interest, Message, Game, test } = require('./index.js');

// Create a user
const addUser = function (username, password, imgPath, phoneNum, email, zip) {
  const newUser = new User({
    name: username,
    password,
    img: imgPath,
    phone: phoneNum,
    email,
    zip,
  });
  newUser.save((err) => {
    if (err) {
      return handleError(err);
    }
    console.log('user saved');

  });
};

// Create a game
const addGame = function (name, type, description, street, city, state, zip, creator, date, time) {
  const newGame = new Game({
    name, type, description, street, city, state, zip, creator, date, time,
  });
  newGame.save((err) => {
    if (err) {
      return handleError(err);
    }
    console.log('event saved');

  });
};

//create interest
const addInterestToPlayer = function (userName, interest) {
  User.updateOne({ name: userName }, { $push: { interests: interest }}, (err) => {
    if(err) {
      return handleError(err);
    } else {
      console.log('interest added');
    }
  })
};

// User can express interest in a game
const addPlayerToGame = function (userName, gameName) {
  Game.updateOne({ name: gameName }, { $push: { players: userName } }, (err) => {
    if (err) {
      return handleError(err);
    } else {
    console.log('player added to game');
    }
  })
  .then(User.updateOne({ name: userName }, { $push: { events: gameName }}, (err) => {
    if(err) {
      return handleError(err);
    } else {
      console.log('game added for player');
    }
  }))
  .then(Game.findOne({ name: gameName }, (err, game) => {
    if(err){
      return handleError(err);
    } else {
      let interest = game.type;
      console.log(interest);
      addInterestToPlayer(userName, interest);
    }
  }))

};


//Get game by name
const getGameByName = function (gameName, callback){
  Game.findOne({ name: gameName }, function(err, game){
    if(err){
      return handleError(err);
    } else {
      callback(game);
    }
  })
}

// Get all events that a user has signed up for
const getGamesForUser = function (userName, callback) {
  User.findOne({ name: userName }, (err, user) => {
    if(err){
      return handleError(err);
    } else {
      let happenings = user.events;
      callback(happenings)
    }
  })  
};

module.exports.addUser = addUser;
module.exports.addGame = addGame;
module.exports.addPlayerToGame = addPlayerToGame;
module.exports.getGameByName = getGameByName;
module.exports.getGamesForUser = getGamesForUser;
module.exports.addInterestToPlayer = addInterestToPlayer;