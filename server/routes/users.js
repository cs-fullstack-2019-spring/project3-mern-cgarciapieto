var express = require('express');
var router = express.Router();

var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userCollection = require('../models/UserSchema');
var ObjectID = require('mongodb').ObjectID;

router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  userCollection.findById(id, function(err, user) {
    done(err, user);
  });
});
var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
};
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

router.get('/', (req, res, next) => {
  console.log("Home page");
  console.log(req.session);
  console.log(req.session.username);

  if (req.session.username) {
    res.send(req.session.username);
  } else {
    res.send(null);
  }
});


router.get('/logout', (req, res, next) => {
  console.log(req.session);

  if (req.session) {
    console.log("has session");
    req.session=null;
    res.send("Logged Out");
  } else {
    console.log("Doesn't have session");
    res.send("Not logged in");
  }
});




passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log("Local Strategy");
      userCollection.findOne({ username: username }, function (err, user) {
        if (err) { console.log("1");
          return done(err); }
        if (!user) {
          console.log("2");
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!isValidPassword(user, password)) {
          console.log("3");
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log("4");
        console.log(user);
        return done(null, user, { user: user.username });
      });
    }
));


router.post('/login',
    passport.authenticate('local',
        {failureRedirect: '/users/loginfail' }),


    function(req, res) {
      req.session.username=req.body.username;
      console.log("Saving cookie");
      res.send(req.body.username);
    });


router.get('/loginsuccess', (req, res)=>{
  res.send("Successful Logging in!!!")
});

router.get('/loginfail', (req, res)=>{
  res.send(undefined)
});


passport.use('signup', new LocalStrategy(
    {passReqToCallback : true},
    function(req, username, password, done) {
      console.log("0");
      findOrCreateUser = function(){
        userCollection.findOne({'username':username},function(err, user) {
          if (err){
            console.log("1");
            console.log('Error in SignUp: '+err);
            return done(err);
          }
          if (user) {
            console.log("2");
            console.log('User already exists');
            return done(null, false,
                { message: 'User already exists.' }
            );
          } else {
            console.log("3");
            var newUser = new userCollection();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.imageURL = req.param('imageURL');
            newUser.backgroundImageURL = req.param('backgroundImageURL');



            newUser.save(function(err) {
              if (err){
                console.log("4");
                console.log('Error in Saving user: '+err);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser);
            });
          }
        });
      };

      process.nextTick(findOrCreateUser);
    })
);


router.post('/newuser',
    passport.authenticate('signup',
        { successRedirect: '/users/successNewUser',
          failureRedirect: '/users/failNewUser'
        }
    ),
    function(req, res) {
      console.log("test");
      res.send('Authenticated!');
    });


router.get('/successNewUser', (req, res)=>{
  console.log(req.body);
  res.send("Added New User")
});


router.get('/failNewUser', (req, res)=>{
  console.log("Failed New User");
});

router.get('/getTweet', (req, res)=>{
    console.log({username: req.session.username});
  userCollection.findOne({username: req.session.username}, (errors, results)=>{
    if(results){ return res.send(results); }
    else{return res.send({message: "no tweets"})}
  })
});

/*find one and update and finding the usercollection model, grabs the username and then updates/saves the added tweet to tweetItems*/




router.post('/addTweet', (req,res)=>{
    userCollection.findOneAndUpdate({username: req.body.username},

        {$push:
                {
                    // _id: new ObjectID(),
                    tweets: req.body.tweetItems
                }
        },
        (errors, results)=>{
        console.log("what client sends to the server");
        console.log(req.body);
            if(errors) res.send(errors);
            else res.send("Tweet Added!");
        });
});

router.get('/getAllUsers', (req, res)=>{
    userCollection.find({username: req.session.username}, (errors, results)=>{
        if(results){ return res.send(results); }
        else{return res.send({message: "no users found"})}
    })
});


router.get('/getAllTweets', (req, res)=>{
    userCollection.find({username: req.session.username}, (errors, results)=>{
        if(results){ return res.send(results); }
        else{return res.send({message: "no tweets"})}
    })
});


router.post('/updateTweet', (req,res)=>{
    userCollection.findOneAndUpdate(
        {_id: req.body.tweetId},
        {
            $set: {
                'messageField.$': req.body.messageField,
                'tweetImageUrl.$': req.body.tweetImageUrl,
                'privateCheckBox.$': req.body.privateCheckBox,
            }
        },
        (errors, results)=>{
            if(errors) res.send(errors);
            else res.send("Tweet Updated!");
        });
});

module.exports = router;