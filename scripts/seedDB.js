const mongoose = require("mongoose");
const db = require("../models");
const bcrypt = require("bcryptjs");

//Configutation variables. Change these to make the database bigger or smaller.
const numGameRecords   = 300;
const numForums        = 50;
const maxForumComments = 50;

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

const users =
[
    "chris", "nick", "tyler", "elijah", "bob", "mark", "sue", "julie", "frank", "jeff",
    "jeoff", "mike", "thor", "rexor", "conan", "thulsa doom", "flippers", "max",
    "juan pelota", "phil mcgroin"
];

//Working variables.
const maxSpectators  = users.length - 2;
let commentIndex     = 0;
let allComments      = [];
let allCommentsIndex = 0;
let allForums        = [];
let allUsers         = [];
let allUsersIndex    = 0;

//1000 most common words in the english language.
const words =
[
    "the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", "with", "as",
    "I", "his", "they", "be", "at", "one", "have", "this", "from", "or", "had", "by", "not", "word", "but", "what",
    "some", "we", "can", "out", "other", "were", "all", "there", "when", "up", "use", "your", "how", "said",
    "an", "each", "she", "which", "do", "their", "time", "if", "will", "way", "about", "many", "then", "them",
    "write", "would", "like", "so", "these", "her", "long", "make", "thing", "see", "him", "two", "has", "look",
    "more", "day", "could", "go", "come", "did", "number", "sound", "no", "most", "people", "my", "over", "know",
    "water", "than", "call", "first", "who", "may", "down", "side", "been", "now", "find", "any", "new", "work",
    "part", "take", "get", "place", "made", "live", "where", "after", "back", "little", "only", "round", "man",
    "year", "came", "show", "every", "good", "me", "give", "our", "under", "name", "very", "through", "just",
    "form", "sentence", "great", "think", "say", "help", "low", "line", "differ", "turn", "cause", "much",
    "mean", "before", "move", "right", "boy", "old", "too", "same", "tell", "does", "set", "three", "want", "air",
    "well", "also", "play", "small", "end", "put", "home", "read", "hand", "port", "large", "spell", "add", "even",
    "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", "men", "change", "went", "light",
    "kind", "off", "need", "house", "picture", "try", "us", "again", "animal", "point", "mother", "world", "near",
    "build", "self", "earth", "father", "head", "stand", "own", "page", "should", "country", "found", "answer",
    "school", "grow", "study", "still", "learn", "plant", "cover", "food", "sun", "four", "between", "state",
    "keep", "eye", "never", "last", "let", "thought", "city", "tree", "cross", "farm", "hard", "start", "might",
    "story", "saw", "far", "sea", "draw", "left", "late", "run", "don't", "while", "press", "close", "night",
    "real", "life", "few", "north", "open", "seem", "together", "next", "white", "children", "begin", "got",
    "walk", "example", "ease", "paper", "group", "always", "music", "those", "both", "mark", "often", "letter",
    "until", "mile", "river", "car", "feet", "care", "second", "book", "carry", "took", "science", "eat", "room",
    "friend", "began", "idea", "fish", "mountain", "stop", "once", "base", "hear", "horse", "cut", "sure",
    "watch", "color", "face", "wood", "main", "enough", "plain", "girl", "usual", "young", "ready", "above",
    "ever", "red", "list", "though", "feel", "talk", "bird", "soon", "body", "dog", "family", "direct", "pose",
    "leave", "song", "measure", "door", "product", "black", "short", "numeral", "class", "wind", "question",
    "happen", "complete", "ship", "area", "half", "rock", "order", "fire", "south", "problem", "piece", "told",
    "knew", "pass", "since", "top", "whole", "king", "space", "heard", "best", "hour", "better", "true", "during",
    "hundred", "five", "remember", "step", "early", "hold", "west", "ground", "interest", "reach", "fast",
    "verb", "sing", "listen", "six", "table", "travel", "less", "morning", "ten", "simple", "several", "vowel",
    "toward", "war", "lay", "against", "pattern", "slow", "center", "love", "person", "money", "serve", "appear",
    "road", "map", "rain", "rule", "govern", "pull", "cold", "notice", "voice", "unit", "power", "town", "fine",
    "certain", "fly", "fall", "lead", "cry", "dark", "machine", "note", "wait", "plan", "figure", "star", "box",
    "noun", "field", "rest", "correct", "able", "pound", "done", "beauty", "drive", "stood", "contain", "front",
    "teach", "week", "final", "gave", "green", "oh", "quick", "develop", "ocean", "warm", "free", "minute", "strong",
    "special", "mind", "behind", "clear", "tail", "produce", "fact", "street", "inch", "multiply", "nothing",
    "course", "stay", "wheel", "full", "force", "blue", "object", "decide", "surface", "deep", "moon", "island",
    "foot", "system", "busy", "test", "record", "boat", "common", "gold", "possible", "plane", "stead", "dry",
    "wonder", "laugh", "thousand", "ago", "ran", "check", "game", "shape", "equate", "hot", "miss", "brought",
    "heat", "snow", "tire", "bring", "yes", "distant", "fill", "east", "paint", "language", "among", "grand",
    "ball", "yet", "wave", "drop", "heart", "am", "present", "heavy", "dance", "engine", "position", "arm", "wide",
    "sail", "material", "size", "vary", "settle", "speak", "weight", "general", "ice", "matter", "circle", "pair",
    "include", "divide", "syllable", "felt", "perhaps", "pick", "sudden", "count", "square", "reason", "length",
    "represent", "art", "subject", "region", "energy", "hunt", "probable", "bed", "brother", "egg", "ride", "cell",
    "believe", "fraction", "forest", "sit", "race", "window", "store", "summer", "train", "sleep", "prove", "lone",
    "leg", "exercise", "wall", "catch", "mount", "wish", "sky", "board", "joy", "winter", "sat", "written", "wild",
    "instrument", "kept", "glass", "grass", "cow", "job", "edge", "sign", "visit", "past", "soft", "fun", "bright",
    "gas", "weather", "month", "million", "bear", "finish", "happy", "hope", "flower", "clothe", "strange", "gone",
    "jump", "baby", "eight", "village", "meet", "root", "buy", "raise", "solve", "metal", "whether", "push", "seven",
    "paragraph", "third", "shall", "held", "hair", "describe", "cook", "floor", "either", "result", "burn", "hill",
    "safe", "cat", "century", "consider", "type", "law", "bit", "coast", "copy", "phrase", "silent", "tall", "sand",
    "soil", "roll", "temperature", "finger", "industry", "value", "fight", "lie", "beat", "excite", "natural",
    "view", "sense", "ear", "else", "quite", "broke", "case", "middle", "kill", "son", "lake", "moment", "scale", "loud",
    "spring", "observe", "child", "straight", "consonant", "nation", "dictionary", "milk", "speed", "method",
    "organ", "pay", "age", "section", "dress", "cloud", "surprise", "quiet", "stone", "tiny", "climb", "cool", "design",
    "poor", "lot", "experiment", "bottom", "key", "iron", "single", "stick", "flat", "twenty", "skin", "smile", "crease",
    "hole", "trade", "melody", "trip", "office", "receive", "row", "mouth", "exact", "symbol", "die", "least", "trouble",
    "shout", "except", "wrote", "seed", "tone", "join", "suggest", "clean", "break", "lady", "yard", "rise", "bad", "blow",
    "oil", "blood", "touch", "grew", "cent", "mix", "team", "wire", "cost", "lost", "brown", "wear", "garden", "equal",
    "sent", "choose", "fell", "fit", "flow", "fair", "bank", "collect", "save", "control", "decimal", "gentle", "woman",
    "captain", "practice", "separate", "difficult", "doctor", "please", "protect", "noon", "whose", "locate", "ring",
    "character", "insect", "caught", "period", "indicate", "radio", "spoke", "atom", "human", "history", "effect",
    "electric", "expect", "crop", "modern", "element", "hit", "student", "corner", "party", "supply", "bone", "rail",
    "imagine", "provide", "agree", "thus", "capital", "won't", "chair", "danger", "fruit", "rich", "thick", "soldier",
    "process", "operate", "guess", "necessary", "sharp", "wing", "create", "neighbor", "wash", "bat", "rather", "crowd",
    "corn", "compare", "poem", "string", "bell", "depend", "meat", "rub", "tube", "famous", "dollar", "stream", "fear",
    "sight", "thin", "triangle", "planet", "hurry", "chief", "colony", "clock", "mine", "tie", "enter", "major", "fresh",
    "search", "send", "yellow", "gun", "allow", "print", "dead", "spot", "desert", "suit", "current", "lift", "rose",
    "continue", "block", "chart", "hat", "sell", "success", "company", "subtract", "event", "particular", "deal",
    "swim", "term", "opposite", "wife", "shoe", "shoulder", "spread", "arrange", "camp", "invent", "cotton", "born",
    "determine", "quart", "nine", "truck", "noise", "level", "chance", "gather", "shop", "stretch", "throw", "shine",
    "property", "column", "molecule", "select", "wrong", "gray", "repeat", "require", "broad", "prepare", "salt", "nose",
    "plural", "anger", "claim", "continent", "oxygen", "sugar", "death", "pretty", "skill", "women", "season", "solution",
    "magnet", "silver", "thank", "branch", "match", "suffix", "especially", "fig", "afraid", "huge", "sister", "steel",
    "discuss", "forward", "similar", "guide", "experience", "score", "apple", "bought", "led", "pitch", "coat", "mass",
    "card", "band", "rope", "slip", "win", "dream", "evening", "condition", "feed", "tool", "total", "basic", "smell",
    "valley", "nor", "double", "seat", "arrive", "master", "track", "parent", "shore", "division", "sheet", "substance",
    "favor", "connect", "post", "spend", "chord", "fat", "glad", "original", "share", "station", "dad", "bread", "charge",
    "proper", "bar", "offer", "segment", "slave", "duck", "instant", "market", "degree", "populate", "chick", "dear",
    "enemy", "reply", "drink", "occur", "support", "speech", "nature", "range", "steam", "motion", "path", "liquid",
	"log", "meant", "quotient", "teeth", "shell", "neck"
]

let endSeed = () => process.exit(0);

/******************************************* User Data *******************************************/

const userSeed = [];

//Create the userSeed array.
for(let i = 0; i < users.length; i++)
{
    let user =
    {
        username: users[i],
        password: bcrypt.hashSync(users[i], bcrypt.genSaltSync(10), null),
        date: new Date(Date.now()),
        downBtn: 40, downIndex: 0, downType: 0, leftBtn: 37, leftIndex: 0,
        leftType: 0, rightBtn: 39, rightIndex: 0, rightType: 0, flipCWBtn: 76, 
        flipCWIndex: 0, flipCWType:  0, flipCCWBtn: 75,  flipCCWIndex: 0,
        flipCCWType: 0, pauseBtn: 80, pauseIndex: 0, pauseType: 0,
        highScore: 0, level: 0, lines: 0
    }

    userSeed.push(user);
}

//Add forums to users.
let addForumsToUsers = () =>
{
    if(allUsersIndex < allUsers.length)
    {
        let owned     = [];
        let player2   = [];
        let spectator = [];

        for(let i = 0; i < allForums.length; i++)
        {
            if(allForums[i].owner === allUsers[allUsersIndex].username)
            {
                owned.push(allForums[i]._id);
            }
        }

        for(let i = 0; i < allForums.length; i++)
        {
            if(allForums[i].player2 === allUsers[allUsersIndex].username)
            {
                player2.push(allForums[i]._id);
            }
        }

        for(let i = 0; i < allForums.length; i++)
        {
            for(let j = 0; j < allForums[i].spectators.length; j++)
            {
                if(allForums[i].spectators[j].username === allUsers[allUsersIndex].username)
                {
                    spectator.push(allForums[i]._id);
                }
            }
        }
        
        console.log("**************************************");
        console.log("User: " + allUsers[allUsersIndex].username);
        console.log("Owned forums:");
        console.log(owned);
        console.log("Player forums:");
        console.log(player2);
        console.log("Spectator forums:");
        console.log(spectator);

        db.User.findOneAndUpdate({ username:  allUsers[allUsersIndex].username},
            { $push: { ownedForums: owned } }, { new: true })
        .then(() => db.User.findOneAndUpdate({ username:  allUsers[allUsersIndex].username},
            { $push: { playerForums: player2 } }, { new: true }))
        .then(() => db.User.findOneAndUpdate({ username:  allUsers[allUsersIndex].username},
            { $push: { otherForums: spectator } }, { new: true }))
        .then(() =>
        {
            allUsersIndex++;
            addForumsToUsers();
        })
    }
    else
    {
        db.User.findOne({username: "nick"})
        .populate("otherForums")
        .populate("ownedForums")
        .populate("playerForums")
        .then((data) =>
        {
            console.log(data);
            endSeed();
        })
        
    }
}

/******************************************* Game Data *******************************************/

const gameSeed = [];

//Create the gameSeed array.
for(let i = 0; i < numGameRecords; i++)
{
    //Get player1 and player2 names.  Make sure they are unique.
    let player2;
    let player1 = users[Math.floor(Math.random() * users.length)];
    do
    {
        player2 = users[Math.floor(Math.random() * users.length)];
    } 
    while(player2 === player1);

    //Determine if this is a single player game or not.
    let singlePlayer = Math.round(Math.random()) ? true : false;
    
    //Get the player levels.
    let level1 = Math.floor(Math.random() * 30);
    let level2 = Math.floor(Math.random() * 30);

    //Get the player lines.
    let lines1 = Math.floor(Math.random() * level1 * 10);
    let lines2 = Math.floor(Math.random() * level2 * 10);

    //Get the player scores.
    let score1 = Math.floor(Math.random() * lines1 * (250 * (level1 + 1)));
    let score2 = Math.floor(Math.random() * lines2 * (250 * (level2 + 1)));
    score1 -= (score1 % 10);
    score2 -= (score2 % 10);

    let game =
    {
        player1: player1,
        score1:  score1,
        level1:  level1,
        lines1:  lines1,
        date1:   new Date(Date.now() - (Math.floor(Math.random() * 1000000000))),
        player2: singlePlayer ? "" : player2,
        score2:  singlePlayer ? 0 : score2,
        level2:  singlePlayer ? 0 : level2,
        lines2:  singlePlayer ? 0 : lines2,
        date2:   new Date(Date.now() - (Math.floor(Math.random() * 1000000000))),
        singlePlayer: singlePlayer,
        rngSeed: Math.floor(Math.random() * 1000000000)
    };

    gameSeed.push(game);
}

/****************************************** Forum Data *******************************************/

let forumSeed = [];

//Create the forumSeed array.
for(let i = 0; i < numForums; i++)
{
    let forumOwner = users[Math.floor(Math.random() * users.length)];
    let forumName = "";
    let player2 = "";
    let startLevel = Math.floor(Math.random() * 20);
    let interference = Math.floor(Math.random() * 11) / 10;
    let forumDate = new Date(Date.now());
    let spectators = [];
    let spectatorArr = [];

    //Create a forum name of up to 9 random words.
    let numWords = Math.floor(Math.random() * 9);
    for(let j = 0; j < numWords; j++)
    {
        forumName += words[Math.floor(Math.random() * words.length)] + " ";
    }

    //Determnine if there is a player 2.
    let isPlayer2 = Math.floor(Math.random() * 20);
    if(isPlayer2 < 19)
    {
        do //Assign player 2.
        {
            player2 = users[Math.floor(Math.random() * users.length)];
        }
        while(player2 === forumOwner);
    }

    //Create an array of spectators.
    let numSpectators = Math.floor(Math.random() * maxSpectators + 1);
    for(let j = 0; j < numSpectators; j++)
    {
        let spectator;
        let isModerator = false;

        do //Assign spectators.
        {
            spectator = users[Math.floor(Math.random() * users.length)];
        }
        while((spectator === forumOwner) || (spectator === player2) || spectatorArr.includes(spectator));

        //Determine if the spectator is a moderator or not -- 20% change.
        let moderatorNum = Math.floor(Math.random() * 5);
        if(moderatorNum > 3)
        {
            isModerator = true;
        }

        spectatorArr.push(spectator);
        spectators.push({ username: spectator, isModerator: isModerator });
    }

    let forum =
    {
        owner:        forumOwner,
        forumName:    forumName,
        startLevel:   startLevel,
        interference: interference,
        player2:      player2,
        date:         forumDate,
        spectators:   spectators
    };

    forumSeed.push(forum);
}

//Add comment ids to the forums.
let addCommentsToForums = () =>
{
    if(allCommentsIndex < allComments.length)
    {
        db.Forum.findOneAndUpdate({ _id: allComments[allCommentsIndex].forumId },
            { $push: { comments: allComments[allCommentsIndex]._id } }, { new: true })
        .then(() =>
        {
            allCommentsIndex++;
            addCommentsToForums();
        })
    }
    else
    {
        db.Forum.find({})
        .then((data) =>
        {
            allForums = [...data];
            
        })
        .then(() => db.User.find({}))
        .then((data) =>
        {
            allUsers = [...data];
            addForumsToUsers();
        })
    }
}
    
/***************************************** Comment Data ******************************************/

let commentsSeed = [];

//Create an array of comments for each forum.
for(let i = 0; i < forumSeed.length; i++)
{
    //Build the comments for this forum.
    let comments = [];

    //Generate the number of comments for this forum.
    let numComments = Math.floor(Math.random() * maxForumComments);
    for(let j = 0; j < numComments; j++)
    {
        let comment = "";

        //Max 20 words per comment.
        let numWords = Math.floor(Math.random() * 19 + 1);

        //Create a comment with random words.
        for(let k = 0; k < numWords; k++)
        {
            comment += words[Math.floor(Math.random() * words.length)] + " ";
        }
        
        let commentObj = 
        {
            username: users[Math.floor(Math.random() * users.length)],
            comment:  comment,
            date:     new Date(Date.now()),
            forumId:  0
        }
        comments.push(commentObj);
    }
    commentsSeed.push(comments);
}

let addCommentsToDB = () =>
{
    db.Comment.collection.insertMany(commentsSeed[commentIndex])
    .then(() => 
    {
        //Move to next forum with comments.
        do
        {
            commentIndex++;
        }
        while(commentsSeed[commentIndex] && !commentsSeed[commentIndex].length);
    
        if(commentIndex < commentsSeed.length)
        {
                addCommentsToDB();
        }
        else
        {
            //Tell the user how many comments were added to the database.
            let totalComments = 0;
            for(let i = 0; i < commentsSeed.length; i++)
            {
                totalComments += commentsSeed[i].length;
            }
            console.log(totalComments + " comment records inserted!");

            //Get all the comments.
            db.Comment.find({})
            .then((data) => 
            {
                allComments = [...data];
            })
            .then(() => addCommentsToForums());
        }
    })
    .catch(err =>
    {
        console.error(err);
        process.exit(1);
    });
}

/************************************** Database Functions ***************************************/

db.User.remove({})
.then(() => db.User.collection.insertMany(userSeed))
.then(data => console.log(data.result.n + " user records inserted!"))
.then(() =>

db.Game.remove({}))
.then(() => db.Game.collection.insertMany(gameSeed))
.then(data => console.log(data.result.n + " game records inserted!"))
.then(() =>

db.Forum.remove({}))
.then(() => db.Forum.collection.insertMany(forumSeed))
.then((data) => 
{
    console.log(data.result.n + " forum records inserted!");
    let forumIds = Object.values(data.insertedIds);

    //Add forum IDs to the comments.
    for(let i = 0; i < commentsSeed.length; i++)
    {
        for(let j = 0; j < commentsSeed[i].length; j++)
        {
            commentsSeed[i][j].forumId = forumIds[i];
        }
    }
})
.then(() =>

db.Comment.remove({}))
.then(() => 
{
    //Skip past any leading forums with no comments.
    while(commentsSeed[commentIndex] && !commentsSeed[commentIndex].length)
    {
        commentIndex++;
    }

    if(commentIndex < commentsSeed.length)
    {
        addCommentsToDB();
    }
    else
    {
        endSeed();
    }
})
