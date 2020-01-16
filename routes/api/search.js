const router = require("express").Router();
const axios = require("axios");

require("dotenv").config();
const keys = require("../../keys");

//Matches with "/api/search/:param"
router.get("/:param", (req, res, next) =>
{
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + req.params.param + "&key=" + keys.google.key)
    .then(data => res.json(data.data))
    .catch(err => next(err));
})

module.exports = router;
