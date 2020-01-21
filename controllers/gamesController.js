const db = require("../models");

// Defining methods for the gamesController
module.exports =
{
    //Create a new game.
    create: (req, res) =>
    {
        db.Game.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Update player scores.
    update: (req, res) =>
    {
        db.Game.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Get top 100 single player scores.
    single100: (req, res) =>
    {
        db.Game.find({ singlePlayer: true }).sort({ score1: -1, date1: 1 }).limit(100)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Get a user's single player game scores.
    singleUser: (req, res) =>
    {
        db.Game.find({ player1: req.params.username, singlePlayer: true }).sort({ score1: -1, date1: 1 }).limit(100)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Get top 100 multiplayer scores.
    multi100: (req, res) =>
    {
        db.Game.find({ singlePlayer: false }).sort({ score1: -1, date1: 1 }).limit(100)
        .then(dbModel1 =>
        {
            db.Game.find({ singlePlayer: false }).sort({ score2: -1, date2: 1 }).limit(100)
            .then(dbModel2 =>
            {
                let index1     = 0;
                let index2     = 0;
                let totalCount = 0;
                let loop       = true;
                let newModel   = [];
                let thisObject = {};

                //Need to manually merge the arrays.
                while(loop)
                {
                    if(index1 < dbModel1.length && index2 < dbModel2.length)
                    {
                        if(dbModel1[index1].score1 > dbModel2[index2].score2)
                        {
                            thisObject = dbModel1[index1++]
                            newModel.push(
                            {
                                player: thisObject.player1,
                                score:  thisObject.score1,
                                level:  thisObject.level1,
                                lines:  thisObject.lines1,
                                date:   thisObject.date1
                            });
                        }
                        else if(dbModel1[index1].score1 < dbModel2[index2].score2)
                        {
                            thisObject = dbModel2[index2++]
                            newModel.push(
                            {
                                player: thisObject.player2,
                                score:  thisObject.score2,
                                level:  thisObject.level2,
                                lines:  thisObject.lines2,
                                date:   thisObject.date2
                            });
                        }
                        else
                        {
                            if(dbModel1[index1].date1 < dbModel2[index2].date2)
                            {
                                thisObject = dbModel1[index1++]
                                newModel.push(
                                {
                                    player: thisObject.player1,
                                    score:  thisObject.score1,
                                    level:  thisObject.level1,
                                    lines:  thisObject.lines1,
                                    date:   thisObject.date1
                                });
                            }
                            else
                            {
                                thisObject = dbModel2[index2++]
                                newModel.push(
                                {
                                    player: thisObject.player2,
                                    score:  thisObject.score2,
                                    level:  thisObject.level2,
                                    lines:  thisObject.lines2,
                                    date:   thisObject.date2
                                });
                            }
                        }
                    }
                    else if(index1 < dbModel1.length)
                    {
                        thisObject = dbModel1[index1++]
                        newModel.push(
                        {
                            player: thisObject.player1,
                            score:  thisObject.score1,
                            level:  thisObject.level1,
                            lines:  thisObject.lines1,
                            date:   thisObject.date1
                        });
                    }
                    else if(index2 < dbModel2.length)
                    {
                        thisObject = dbModel2[index2++]
                        newModel.push(
                        {
                            player: thisObject.player2,
                            score:  thisObject.score2,
                            level:  thisObject.level2,
                            lines:  thisObject.lines2,
                            date:   thisObject.date2
                        });
                    }

                    if(++totalCount >= 100)
                    {
                        loop = false;
                    }
                }
                
                //res.json(newModel);
                res.json(newModel);
            });
        })
        .catch(err => res.status(422).json(err));
    },

    //Get a user's multiplayer player game scores.
    multiUser: (req, res) =>
    {
        db.Game.find({ player1: req.params.username, singlePlayer: false }).sort({ score1: -1, date1: 1 }).limit(100)
        .then(dbModel1 =>
        {
            db.Game.find({ player2: req.params.username, singlePlayer: false }).sort({ score2: -1, date2: 1 }).limit(100)
            .then(dbModel2 =>
            {
                let index1     = 0;
                let index2     = 0;
                let totalCount = 0;
                let loop       = true;
                let newModel   = [];
                let thisObject = {};

                //Need to manually merge the arrays.
                while(loop)
                {
                    if(index1 < dbModel1.length && index2 < dbModel2.length)
                    {
                        if(dbModel1[index1].score1 > dbModel2[index2].score2)
                        {
                            thisObject = dbModel1[index1++]
                            newModel.push(
                            {
                                player: thisObject.player1,
                                score:  thisObject.score1,
                                level:  thisObject.level1,
                                lines:  thisObject.lines1,
                                date:   thisObject.date1
                            });
                        }
                        else if(dbModel1[index1].score1 < dbModel2[index2].score2)
                        {
                            thisObject = dbModel2[index2++]
                            newModel.push(
                            {
                                player: thisObject.player2,
                                score:  thisObject.score2,
                                level:  thisObject.level2,
                                lines:  thisObject.lines2,
                                date:   thisObject.date2
                            });
                        }
                        else
                        {
                            if(dbModel1[index1].date1 < dbModel2[index2].date2)
                            {
                                thisObject = dbModel1[index1++]
                                newModel.push(
                                {
                                    player: thisObject.player1,
                                    score:  thisObject.score1,
                                    level:  thisObject.level1,
                                    lines:  thisObject.lines1,
                                    date:   thisObject.date1
                                });
                            }
                            else
                            {
                                thisObject = dbModel2[index2++]
                                newModel.push(
                                {
                                    player: thisObject.player2,
                                    score:  thisObject.score2,
                                    level:  thisObject.level2,
                                    lines:  thisObject.lines2,
                                    date:   thisObject.date2
                                });
                            }
                        }
                    }
                    else if(index1 < dbModel1.length)
                    {
                        thisObject = dbModel1[index1++]
                        newModel.push(
                        {
                            player: thisObject.player1,
                            score:  thisObject.score1,
                            level:  thisObject.level1,
                            lines:  thisObject.lines1,
                            date:   thisObject.date1
                        });
                    }
                    else if(index2 < dbModel2.length)
                    {
                        thisObject = dbModel2[index2++]
                        newModel.push(
                        {
                            player: thisObject.player2,
                            score:  thisObject.score2,
                            level:  thisObject.level2,
                            lines:  thisObject.lines2,
                            date:   thisObject.date2
                        });
                    }

                    if(++totalCount >= 100)
                    {
                        loop = false;
                    }
                }
                
                //res.json(newModel);
                res.json(newModel);
            });
        })
        .catch(err => res.status(422).json(err));
    }
};
