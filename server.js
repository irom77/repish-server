var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var ActiveDirectory = require('activedirectory');
config = require('./configure/config');
var ad = new ActiveDirectory(config.AD);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var secret = config.secret;

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
var auth = expressJwt({secret: secret});
app.use('/api', auth );
app.use('/', routes);
//app.use('/users', users);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    next();
});

app.use(function (req, res, next) {
    if (!req.secure) {
        port = app.get('port');
        host = req.headers.host.replace(/:\d+$/, ':' + port);
        //console.log(host, port);
        return res.redirect('https://' + host + req.url);
    }
    next();
});

app.use(passport.initialize());

passport.use(new LocalStrategy(
    function (username, password, done) {
        if (!username.match(/@/)) username = username.concat(config.domain);
        ad.authenticate(username, password, function (err, isAuthenticated) {
            if (err) return done(err, null);
            console.log('---> passport ad.authenticate says', isAuthenticated);
            if (isAuthenticated) {
                if (config.user.indexOf(username.replace(config.domain, '')) >= 0)
                    return done(null, {
                        username: username,
                        group: 'local'
                    });
                config.group.forEach(function (groupName) {
                    ad.isUserMemberOf(username, groupName, function (err, isMember) {
                        if (err) {
                            console.log('ERROR: ' + JSON.stringify(err));
                            return;
                        }
                        if (isMember) return done(null, {
                            username: username,
                            group: groupName
                        })
                    });
                });
            }
            else {
                return done(null, false);
            }
        });
    }
));

app.post('/authenticate', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (user) {
            //console.log(user);
            var profile = {
                user: req.body.username,
                group: user.group
            };
            //jwt.sign(payload, secretOrPrivateKey, options)
            var token = jwt.sign(profile, secret, {expiresInMinutes: 10}); //60 min in prod
            return res.json({token: token});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

//authorization error handler
app.use(function (err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).send(error.stack);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(error.stack);
});


module.exports = app;
