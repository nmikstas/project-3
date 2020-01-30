const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const passport = require('./config/passport');
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// We need to use sessions to keep track of our user's login status
app.use(session(
{
    secret: "ntntsupersecret",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect
(
    process.env.MONGODB_URI || "mongodb://localhost/ntnt",
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

// Start the API server
app.listen(PORT, function()
{
    console.log(`NTNT ==> API Server now listening on PORT ${PORT}!`);
});
