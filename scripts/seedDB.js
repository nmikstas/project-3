const mongoose = require("mongoose");
const db = require("../models");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ntnt");

//Generate data for the test database here.
const userSeed =
[{
    username: "chris",
    password: bcrypt.hashSync("chris", bcrypt.genSaltSync(10), null)
},
{
    username: "nick",
    password: bcrypt.hashSync("nick", bcrypt.genSaltSync(10), null)
},
{
    username: "tyler",
    password: bcrypt.hashSync("tyler", bcrypt.genSaltSync(10), null)
},
{
    username: "elijah",
    password: bcrypt.hashSync("elijah", bcrypt.genSaltSync(10), null)
},
{
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(10), null)
},
{
    username: "mark",
    password: bcrypt.hashSync("mark", bcrypt.genSaltSync(10), null)
},
{
    username: "sue",
    password: bcrypt.hashSync("sue", bcrypt.genSaltSync(10), null)
},
{
    username: "julie",
    password: bcrypt.hashSync("julie", bcrypt.genSaltSync(10), null)
},
{
    username: "frank",
    password: bcrypt.hashSync("frank", bcrypt.genSaltSync(10), null)
},
{
    username: "jeff",
    password: bcrypt.hashSync("jeff", bcrypt.genSaltSync(10), null)
},
{
    username: "joeff",
    password: bcrypt.hashSync("joeff", bcrypt.genSaltSync(10), null)
},
{
    username: "mike",
    password: bcrypt.hashSync("mike", bcrypt.genSaltSync(10), null)
},
{
    username: "thor",
    password: bcrypt.hashSync("thor", bcrypt.genSaltSync(10), null)
},
{
    username: "rexor",
    password: bcrypt.hashSync("rexor", bcrypt.genSaltSync(10), null)
},
{
    username: "conan",
    password: bcrypt.hashSync("conan", bcrypt.genSaltSync(10), null)
},
{
    username: "thulsa doom",
    password: bcrypt.hashSync("thulsa doom", bcrypt.genSaltSync(10), null)
},
{
    username: "flippers",
    password: bcrypt.hashSync("flippers", bcrypt.genSaltSync(10), null)
},
{
    username: "max",
    password: bcrypt.hashSync("max", bcrypt.genSaltSync(10), null)
},
{
    username: "juan pelota",
    password: bcrypt.hashSync("juan pelota", bcrypt.genSaltSync(10), null)
},
{
    username: "phil mcgroin",
    password: bcrypt.hashSync("phil mcgroin", bcrypt.genSaltSync(10), null)
}];

db.User.remove({})
.then(() => db.User.collection.insertMany(userSeed))
.then(data =>
{
    console.log(data.result.n + " records inserted!");
    process.exit(0);
})
.catch(err =>
{
    console.error(err);
    process.exit(1);
});
