const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const UserModel = require('./database')
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretofnavneet';

// passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload)
//     UserModel.findOne({ id: jwt_payload.id }, function (err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));
var mongoose = require('mongoose');
passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    // console.log(jwt_payload.id)
    // console.log(await UserModel.findOne({ _id: jwt_payload.id }));
    // console.log(mongoose.connection.readyState);
    try {
        const user = await UserModel.findOne({ _id: jwt_payload.id });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        return done(err, false);
    }
}));