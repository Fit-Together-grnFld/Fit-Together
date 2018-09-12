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

//add message to game
const addMessage = function(user, game, body){
  let message = new Message({
    user, game, body
  });
  message.save((err)=>{
    if(err) {
      return handleError(err);
    }
    console.log('message posted');
  })
}

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

const getPlayerFromGame = function (userName, gameName, callback) {
  Game.findOne({ name: gameName }, (err, game) => {
    if(err){
      console.log(err)
    } else {
      let players = game.players;
      if(players.includes(userName)){
        callback(userName);
      }
    }
  })
}

//Get game by name
const getGameByName = function (gameName, callback) {
  Game.findOne({ name: gameName }, function(err, game){
    if(err){
      return handleError(err);
    } else {
      callback(game);
    }
  })
}

//Get user by name
const getUserByName = function (userName, callback){
  User.findOne({ name: userName }, (err, user) => {
    if(err){
      console.log(err)
    } else {
      callback(user);
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

//Get all the messages for a game
const getGameMessages = function(gameName, callback) {
  Message.find({ game: gameName }, (err, messages) => {
    if(err){
      console(err)
    } else {
      callback(messages);
    }
  });
}


module.exports.addUser = addUser;
module.exports.addGame = addGame;
module.exports.addPlayerToGame = addPlayerToGame;
module.exports.getGameByName = getGameByName;
module.exports.getGamesForUser = getGamesForUser;
module.exports.addInterestToPlayer = addInterestToPlayer;
module.exports.addMessage = addMessage;
module.exports.getGameMessages = getGameMessages;
module.exports.getUserByName = getUserByName;
module.exports.getPlayerFromGame = getPlayerFromGame;