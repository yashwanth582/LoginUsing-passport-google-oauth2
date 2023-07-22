require('dotenv').config()

const express = require('express')
const passport = require('passport')
// const cookieSession = require('cookie-session')
const app = express()
require('./passport-setup')
app.set("view engine", "ejs")
const session = require('express-session');
// After you declare "app"
app.use(session({ secret: 'this is the secret' }));
app.use(passport.initialize())
// app.use(cookieSession({
//     name: 'just-session',
//     keys:['key1', 'key2']
// }))
app.use(passport.session())
app.get('/', (req, res)=>{
    res.render("pages/index")
})
app.get('/success', (req, res)=>{
    res.render('pages/profile.ejs', {name:req.user.displayName, email:req.user.emails[0].value, pic:req.user.photos[0].value})
})
app.get('/google',passport.authenticate('google',{scope:['profile', 'email']}))
app.get('/google/callback', passport.authenticate('google',{failureRedirect:'/failed'}),
(req, res)=>{
    res.redirect('/success')
})
app.get('/logout', (req, res, next)=>{
    req.session = null;
    req.logout(function(err){
        if(err) {return next(err)}
        res.redirect('/')
    });
    res.redirect('/');
})
app.listen(5000, ()=>{
    console.log("app is running on port 5000")
}) 