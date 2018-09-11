const { User, Interest, Message, Game, test } = require('./index.js');


//Create a user
const addUser = function(username, password, imgPath, phoneNum, email, zip){
  let newUser = new User({ 
    name: username, 
    password: password, 
    img: imgPath, 
    phone: phoneNum, 
    email: email, 
    zip: zip 
  });
  newUser.save(function (err) {
    if (err) {
      return handleError(err);
    } else { 
      console.log('user saved')
    } 
  });
}

//Create a game
const addGame = function(name, type, description, street, city, state, zip, creator, date, time){
  let newGame = new Game({
    name, type, description, street, city, state, zip, date, time
  })
  newGame.save(function(err){
    if(err){
      return handleError(err);
    } else {
      console.log('event saved')
    }
  })
}

//User can express interest in a game
const addPlayerToGame = function(userName, gameName){
  Game.updateOne({ name: gameName }, {$push: {players: userName}}, function(err){
    if(err){
      return handleError(err)
    } else {
      console.log('player added to game');
    }
  });
}

//Get a single user by name 
let getEvent = function(userName, callback){
    
}; 

//Get all games for which a user has signed up
let getInterestedEvents = function(userName, callback) {
  
}

module.exports.addUser = addUser;
module.exports.addGame = addGame;
module.exports.addPlayerToGame = addPlayerToGame;