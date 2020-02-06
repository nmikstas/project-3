let localLoopback  = false;
let remoteLoopback = false;
let debug          = true;
let init           = false;
let isMultiPlayer  = false;
let isSeated       = false;
let player1        = "";
let player2        = "";
let interference;
let startLevel;
let rngSeed;
let gameId;

//Firebase variables.
let firebaseConfig;
let database;
let thisForumKey;
let thisForumRef;
let player1Ref;
let player2Ref;
let p1GameOverRef;
let p2GameOverRef;
let seatedRef;
let rngRef;
let startRef;
let gameIdRef;

//Player 1
let isPlayer1  = false;
let p1GameOver = true;
let p1LinesTrigger = false;
let ntEngine1;
let ntRenderer1;
let ntInput1;
let p1ResetTimer;
let player1Score = 0;
let player1Lines = 0;
let player1Level = 0;

//Player 2
let isPlayer2  = false;
let p2GameOver = true;
let p2LinesTrigger = false;
let ntEngine2;
let ntRenderer2;
let ntInput2;
let p2ResetTimer;
let player2Score = 0;
let player2Lines = 0;
let player2Level = 0;

//Initial gameplay status. Not a complete object. Must add:
//currentLevel, currentScore and linesCleared.
let initStatus =
{
    "gameStatus": 0,
    "lastRequest": 0,
    "lastRequestStatus": 0,
    "pieceCurrent": 0,
    "pieceNext": 0,
    "pieceRotation": 0,
    "pieceThird": 0,
    "pieceX": 5,
    "pieceY": 21,
    "rowsToAddNow": 0,
    "rowsToAddTotal": 0,

    "gameField":
    [
        [ 0, 0, 0, 0, 0, 0, 0, 2, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 2, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 2, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 2, 2, 2, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 3, 0, 0, 3, 0, 0, 0, 0, 0 ],
        [ 0, 3, 0, 3, 3, 0, 0, 0, 0, 0 ],
        [ 0, 3, 3, 0, 3, 0, 0, 0, 0, 0 ],
        [ 0, 3, 0, 0, 3, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 2, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 2, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 2, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 2, 2, 2, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 3, 0, 0, 3, 0, 0, 0, 0, 0 ],
        [ 0, 3, 0, 3, 3, 0, 0, 0, 0, 0 ],
        [ 0, 3, 3, 0, 3, 0, 0, 0, 0, 0 ],
        [ 0, 3, 0, 0, 3, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    ],

    "recommendedColors":
    [
        "rgb(0, 0, 0)",
        "rgb(0, 0, 0)",
        "rgb(0, 0, 0)",
        "rgb(0, 0, 0)",
        "rgb(0, 0, 0)",
    ]
}

let apiArray = 
[
    26, 34, 25, 0,  44, 24, 26, 47, 74, 42,
    43, 30, 17, 41, 11, 6,  46, 55, 44, 46,
    6,  35, 6,  56, 6,  12, 12, 8,  47, 31,
    59, 0,  13, 10, 1,  37, 54, 52, 60
]

let chars =
[
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H' ,'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7',
    '8', '9', '`', '~', '!', '@', '#', '$', '%', '^',
    '&', '*', '(', ')', '-', '_', '+', '=', '|', ';',
    ':', '<', '>', ',', '.', '?', '/', '[', ']', '{',
    '}', '\\', '\'', '\"'
]

makeArray = (refArray, refString) =>
{
    let indexArr = [];

    for(let i = 0; i < refString.length; i++)
    {
        indexArr.push(chars.indexOf(refString[i]));
    }

    return indexArr;
}

makeString = (refArray, refIndexes) =>
{
    let newString = "";

    for(let i = 0; i < refIndexes.length; i++)
    {
        newString += refArray[refIndexes[i]];
    }

    return newString;
}

/**************************************** Resize Listener ****************************************/

resizeCanvases = () =>
{ 
    $("#renderCanvas1").width($("#renderCanvas1").parent().width());
    $("#renderCanvas1").height($("#renderCanvas1").parent().height());
    $("#renderCanvas2").width($("#renderCanvas2").parent().width());
    $("#renderCanvas2").height($("#renderCanvas2").parent().height());
     
    $("#pieceCanvas1").width($("#pieceCanvas1").parent().width());
    $("#pieceCanvas1").height($("#pieceCanvas1").width() / 2);
    $("#pieceCanvas2").width($("#pieceCanvas2").parent().width());
    $("#pieceCanvas2").height($("#pieceCanvas2").width() / 2);
}

window.addEventListener("resize", () => resizeCanvases());

/************************************** Disable Key Scrolling **************************************/

window.addEventListener("keydown", (e) =>
{
    // Disable the up and down keys to keep the page from scrolling while playing.
    if([38, 40].indexOf(e.keyCode) > -1)
    {
        e.preventDefault();
    }
}, false);

/************************************** Game Stats Callback **************************************/

let showStats1 = (level, score, lines) =>
{
    //Append all the stats.
    $("#r-score1").text(score);
    $("#r-level1").text(level);
    $("#r-lines1").text(lines);
}

let showStats2 = (level, score, lines) =>
{
    //Append all the stats.
    $("#r-score2").text(score);
    $("#r-level2").text(level);
    $("#r-lines2").text(lines);
}

/**************************************** Watchdog Timers ****************************************/

p1Reset = () =>
{
    if(p2GameOver)
    {
        startRef.set({start: false});
    }

    p1GameOverRef.set({isGameOver: true});
    player1Ref.set({status: {...initStatus, currentLevel: player1Level, currentScore: player1Score, linesCleared: player1Lines}});
    player1Score = 0;
}

p2Reset = () =>
{
    if(p1GameOver)
    {
        startRef.set({start: false});
    }

    p2GameOverRef.set({isGameOver: true});
    player2Ref.set({status: {...initStatus, currentLevel: player2Level, currentScore: player2Score, linesCleared: player2Lines}});
    player2Score = 0;
}

/***************************************** Game Handlers *****************************************/

let inputHandler1 = (request, param) =>
{
    if(ntEngine1.gameStatus === NTEngine.GS_OVER) return;
    if(request === NTEngine.GR_PAUSE) return;
    if(isPlayer1) ntEngine1.ntRequest(request, param);
}

let inputHandler2 = (request, param) =>
{
    if(ntEngine2.gameStatus === NTEngine.GS_OVER || !isSeated) return;
    if(request === NTEngine.GR_PAUSE) return;
    if(isPlayer2) ntEngine2.ntRequest(request, param);
}

let renderHandler1 = (status) =>
{
    ntRenderer1.gfRender(status);

    //**********For local and remote loopback testing**********
    if(localLoopback && isPlayer1)
    {
        ntRenderer2.gfRender(status);
    }
    else if(remoteLoopback && isPlayer1)
    {
        player1Ref.set({status: status});
    }

    if(status.gameStatus === NTEngine.GS_OVER && !init)
    {
        $("#p1-btn").removeClass("invisible");
    }

    init = false;

    //Real gameplay renderer.
    if(isPlayer1 && !remoteLoopback && !localLoopback)
    {
        player1Ref.set({status: status});
    }

    //Set Player 1 game over status.
    if(status.gameStatus === NTEngine.GS_OVER)
    {
        p1GameOverRef.set({isGameOver: true});
    }
    else
    {
        p1GameOverRef.set({isGameOver: false});
    }
}

let renderHandler2 = (status) =>
{
    ntRenderer2.gfRender(status);

    //**********For local and remote loopback testing**********
    if(localLoopback && isPlayer2)
    {
        ntRenderer1.gfRender(status);
    }
    else if(remoteLoopback && isPlayer2)
    {
        player2Ref.set({status: status});
    }

    if(status.gameStatus === NTEngine.GS_OVER && !init)
    {
        $("#p2-btn").removeClass("invisible");
    }

    init = false;

    //Real gameplay renderer.
    if(isPlayer2 && !remoteLoopback && !localLoopback)
    {
        player2Ref.set({status: status});
    }

    //Set Player 2 game over status.
    if(status.gameStatus === NTEngine.GS_OVER)
    {
        p2GameOverRef.set({isGameOver: true});
    }
    else
    {
        p2GameOverRef.set({isGameOver: false});
    }
}

startRealGame = () =>
{
    startRef.set({start: true});
}

/*************************************** Button Listeners ****************************************/

$(document).ready(() =>
{
    resizeCanvases();
    $(".leave-forum").on("click", () => 
    {
        if(isPlayer2)
        {
            if(p1GameOver)
            {
                startRef.set({start: false});
            }

            p2GameOverRef.set({isGameOver: true});
            player2Ref.set({status: {...initStatus, currentLevel: player2Level, currentScore: player2Score, linesCleared: player2Lines}})
            .then(() =>
            {
                seatedRef.set({isSeated: false});
                window.location.href = "/home";
            })
            .catch((error) =>
            {
                alert("Firebase Error: " + error);
                window.location.href = "/home";
            });
        }
        else if(isPlayer1)
        {
            if(p2GameOver)
            {
                startRef.set({start: false});
            }

            p1GameOverRef.set({isGameOver: true});
            player1Ref.set({status: {...initStatus, currentLevel: player1Level, currentScore: player1Score, linesCleared: player1Lines}})
            .then(() =>
            {
                window.location.href = "/home";
            })
            .catch((error) =>
            {
                alert("Firebase Error: " + error);
                window.location.href = "/home";
            });
        }

        window.location.href = "/home";
    });
});

/*********************************** Game Engine And Renderer ************************************/

let runForum = (data) =>
{
    //------------------ Player 1 -------------------
    //Create a new game engine if player 1 is local.
    if(isPlayer1)
    {
        //Create a new NT game renderer.
        ntRenderer1 = new NTRender(showStats1, isPlayer1);

        ntEngine1 = new NTEngine(123456789, renderHandler1, player1Level);

        //Tie the renderer to the game engine.
        ntRenderer1.ntEngine = ntEngine1;

        //Used to hide play piece during animations.
        ntRenderer1.getField = () => { return ntEngine1.ntGetGameField(); }

        //Input control module.
        ntInput1 = new NTInput
        (
            inputHandler1,
            {
                leftBtn:    data.leftBtn,
                leftIndex:  data.leftIndex,
                leftType:   data.leftType,
                rightBtn:   data.rightBtn,
                rightIndex: data.rightIndex,
                rightType:  data.rightType,
                downBtn:    data.downBtn,
                downIndex:  data.downIndex,
                downType:   data.downType,
                cwBtn:      data.flipCWBtn,
                cwIndex:    data.flipCWIndex,
                cwType:     data.flipCWType,
                ccwBtn:     data.flipCCWBtn,
                ccwIndex:   data.flipCCWIndex,
                ccwType:    data.flipCCWType,
                pauseBtn:   data.pauseBtn,
                pauseIndex: data.pauseIndex,
                pauseType:  data.pauseType
            }
        );

        //Allows inputs to be disabled during animations.
        ntRenderer1.enableInputCallback = ntInput1.enableInputs;
    }
    else
    {
        //Create a new NT game renderer when player 1 is remote.
        ntRenderer1 = new NTRender(showStats1, isPlayer1);
    }
    
    //----------------- Game Field ------------------
    //Get canvas to render the game field on.
    let canvas1 = document.getElementById("renderCanvas1");

    //Create a new babylon engine.
    let engine1 = new BABYLON.Engine(canvas1, true);

    //Create the scene for the Player 1 game board.
    let scene1 = ntRenderer1.gfCreateScene(engine1, canvas1);

    //Register a Babylon render loop to repeatedly render the scene.
    engine1.runRenderLoop(() => scene1.render());

    //Watch for browser/canvas resize events.
    window.addEventListener("resize", () => engine1.resize());

    //----------------- Next Piece ------------------
    //Get canvas to render the next piece on.
    let npCanvas1 = document.getElementById("pieceCanvas1");

    //Create a new babylon engine.
    let npEngine1 = new BABYLON.Engine(npCanvas1, true);

    //Create the scene for the Player 1 next piece.
    let npScene1 = ntRenderer1.npCreateScene(npEngine1);

    //Register a Babylon render loop to repeatedly render the scene.
    npEngine1.runRenderLoop(() => npScene1.render());

    //Watch for browser/canvas resize events.
    window.addEventListener("resize", () => npEngine1.resize());

    //------------------ Player 2 -------------------
    //Create a new game engine if player 2 is local.
    if(isPlayer2)
    {
        //Create a new NT game renderer.
        ntRenderer2 = new NTRender(showStats2, isPlayer2);

        //Create a new game engine.
        ntEngine2 = new NTEngine(123456789, renderHandler2, player2Level);

        //Tie the renderer to the game engine.
        ntRenderer2.ntEngine = ntEngine2;

        //Used to hide play piece during animations.
        ntRenderer2.getField = () => { return ntEngine2.ntGetGameField(); }

        //Input control module.
        ntInput2 = new NTInput
        (
            inputHandler2,
            {
                leftBtn:    data.leftBtn,
                leftIndex:  data.leftIndex,
                leftType:   data.leftType,
                rightBtn:   data.rightBtn,
                rightIndex: data.rightIndex,
                rightType:  data.rightType,
                downBtn:    data.downBtn,
                downIndex:  data.downIndex,
                downType:   data.downType,
                cwBtn:      data.flipCWBtn,
                cwIndex:    data.flipCWIndex,
                cwType:     data.flipCWType,
                ccwBtn:     data.flipCCWBtn,
                ccwIndex:   data.flipCCWIndex,
                ccwType:    data.flipCCWType,
                pauseBtn:   data.pauseBtn,
                pauseIndex: data.pauseIndex,
                pauseType:  data.pauseType
            }
        );

        //Allows inputs to be disabled during animations.
        ntRenderer2.enableInputCallback = ntInput2.enableInputs;
    }
    else
    {
        //Create a new NT game renderer when player 2 is remote.
        ntRenderer2 = new NTRender(showStats2, isPlayer2);
    }

    //----------------- Game Field ------------------
    //Get canvas to render the game field on.
    let canvas2 = document.getElementById("renderCanvas2");

    //Create a new babylon engine.
    let engine2 = new BABYLON.Engine(canvas2, true);

    //Create the scene for the Player 2 game field.
    let scene2 = ntRenderer2.gfCreateScene(engine2, canvas2);

    //Register a Babylon render loop to repeatedly render the scene.
    engine2.runRenderLoop(() => scene2.render());

    //Watch for browser/canvas resize events.
    window.addEventListener("resize", () => engine2.resize());

    //----------------- Next Piece ------------------
    //Get canvas to render the next piece on.
    let npCanvas2 = document.getElementById("pieceCanvas2");

    //Create a new babylon engine.
    let npEngine2 = new BABYLON.Engine(npCanvas2, true);

    //Create the scene for the Player 2 next piece.
    let npScene2 = ntRenderer2.npCreateScene(npEngine2);

    //Register a Babylon render loop to repeatedly render the scene.
    npEngine2.runRenderLoop(() => npScene2.render());

    //Watch for browser/canvas resize events.
    window.addEventListener("resize", () => npEngine2.resize());
}

/************************************** Firebase Listeners ***************************************/
let addListeners = (data) =>
{
    runForum(data);

    //Normal play.
    if(isPlayer1 && !remoteLoopback && !localLoopback)
    {
        //Player 2 is always unseated when entering the forum.
        seatedRef.set({isSeated: false});

        $("#p1-div").html("<button class=\"btn btn-outline-success invisible\" id=\"start-game\">Start Game</button>");
        $("#start-game").on("click", () =>
        {
            //Hide the start button.
            $("#start-game").addClass("invisible");

            //Seed the game RNG.
            let rngSeed = Math.floor(Math.random() * 100000000);
            rngRef.set({rngSeed: rngSeed})
            .then(() =>
            {
                //create a database object for the current game.
                let game = 
                {
                    player1:      player1,
                    level1:       startLevel,
                    player2:      player2,
                    level2:       startLevel,
                    singlePlayer: !isSeated,
                    rngSeed:      rngSeed
                };

                return $.post("/api/games/create/", game);
            })    
            .then(data => gameIdRef.set({id: data._id}))
            .then(() => setTimeout(startRealGame, 2000))
            .catch(err => console.log(err));
        });
    }
    else if(isPlayer2 && !remoteLoopback && !localLoopback)
    {
        //Player 2 is always unseated when entering the forum.
        seatedRef.set({isSeated: false});

        $("#p2-btn-div").html("<button class=\"btn btn-outline-success invisible\" id=\"sit-btn\">Sit</button>");
        $("#sit-btn").on("click", () =>
        {
            if(isSeated)
            {
                isSeated = false;
                seatedRef.set({isSeated: false});
                $("#sit-btn").text("Sit");
            }
            else
            {
                isSeated = true;
                seatedRef.set({isSeated: true});
                $("#sit-btn").text("Stand");
            }
        });
    }

    //Add player 2 steated status.
    if(!remoteLoopback && !localLoopback)
    {
        $("#p2-div").html("<div class=\"score-div\"><div class=\"score-text\">Player 2 Status:</div>" +
            "<div id=\"seated-div\" class=\"not-seated\">Not Seated</div></div>");
    }

    //---------- Firebase Listeners ----------
    player1Ref.on("value", snapshot =>
    {
        if(snapshot.val() !== null)
        {
            let status = snapshot.val().status;

            //Need to account for the fact that firebase does not store empty arrays!!!
            if(!status.rowsToErase) status = {...status, rowsToErase: []};
            if(!status.blanks) status = {...status, blanks: []};

            //Add data if not in loopback and player is remote.
            if(!isPlayer1 && !localLoopback && !remoteLoopback)
            {
                ntRenderer1.gfRender(status);
            }

            //Add lines to gamefield.
            if(isPlayer2 && !remoteLoopback && !localLoopback && !(parseInt(status.gameStatus) === NTEngine.GS_OVER))
            {
                //console.log("Player 2 check lines");
                if(status.rowsToErase.length && !p2LinesTrigger)
                {
                    //console.log("Player 2 add lines: " + parseFloat(status.rowsToErase.length) * interference);
                    ntEngine2.ntRequest(NTEngine.GR_ADD_LINES, parseFloat(status.rowsToErase.length) * interference);
                    p2LinesTrigger = true;
                }
                else if(!status.rowsToErase.length && p2LinesTrigger)
                {
                    //console.log("Player 2 Wait");
                    p2LinesTrigger = false;
                }
            }

            //Watchdog timer.
            if(isPlayer2 && !remoteLoopback && !localLoopback)
            {
                if(!p1GameOver)
                {
                    clearTimeout(p1ResetTimer);
                    p1ResetTimer = setTimeout(p1Reset, 10000);
                }
            }

            if(isPlayer1 && (status.currentScore > player1Score))
            {
                //Modify the game data.
                $.ajax("/api/games/update",
                {
                    type: "PUT",
                    data:
                    { 
                        id: gameId,
                        whichPlayer: 1,
                        level1: status.currentLevel,
                        score1: status.currentScore,
                        lines1: status.linesCleared
                    }
                })
                .then((data) =>
                {
                    if(debug)console.log(data);
                })
                .fail(function(err)
                {
                    console.log(err);
                });
            }

            player1Score = status.currentScore;
        }
    }); 

    player2Ref.on("value", snapshot =>
    {
        if(snapshot.val() !== null)
        {
            let status = snapshot.val().status;

            //Need to account for the fact that firebase does not store empty arrays!!!
            if(!status.rowsToErase) status = {...status, rowsToErase: []};
            if(!status.blanks) status = {...status, blanks: []};

            //Add data if not in loopback and player is remote.
            if(!isPlayer2 && !localLoopback && !remoteLoopback)
            {
                ntRenderer2.gfRender(status);
            }

            //Add lines to gamefield.
            if(isPlayer1 && !remoteLoopback && !localLoopback && !(parseInt(status.gameStatus) === NTEngine.GS_OVER))
            {
                //console.log("Player 1 check lines");
                if(status.rowsToErase.length && !p1LinesTrigger)
                {
                    //console.log("Player 1 add lines: " + parseFloat(status.rowsToErase.length) * interference);
                    ntEngine1.ntRequest(NTEngine.GR_ADD_LINES, parseFloat(status.rowsToErase.length) * interference);
                    p1LinesTrigger = true;
                }
                else if(!status.rowsToErase.length && p1LinesTrigger)
                {
                    //console.log("Player 1 Wait");
                    p1LinesTrigger = false;
                }
            }

            //Watchdog timer.
            if(isPlayer1 && !remoteLoopback && !localLoopback)
            {
                if(!p2GameOver)
                {
                    clearTimeout(p2ResetTimer);
                    p2ResetTimer = setTimeout(p2Reset, 10000);
                }
            }

            if(isPlayer2 && (status.currentScore > player2Score))
            {
                //Modify the game data.
                $.ajax("/api/games/update",
                {
                    type: "PUT",
                    data:
                    { 
                        id: gameId,
                        whichPlayer: 2,
                        level2: status.currentLevel,
                        score2: status.currentScore,
                        lines2: status.linesCleared
                    }
                })
                .then((data) =>
                {
                    if(debug)console.log(data);
                })
                .fail(function(err)
                {
                    console.log(err);
                });
            }

            player2Score = status.currentScore;
        }
    });

    p1GameOverRef.on("value", snapshot =>
    {
        if(snapshot.val() !== null)
        {
            if(snapshot.val().isGameOver)
            {
                p1GameOver = true;
            }
            else
            {
                p1GameOver = false;
            }
            
            if(p1GameOver && p2GameOver)
            {
                $("#start-game").removeClass("invisible");
                $("#sit-btn").removeClass("invisible");
                startRef.set({start: false});
            }
            else
            {
                $("#start-game").addClass("invisible");
                $("#sit-btn").addClass("invisible");
            }
        }
    });

    p2GameOverRef.on("value", snapshot =>
    {
        if(snapshot.val() !== null)
        {
            if(snapshot.val().isGameOver)
            {
                p2GameOver = true;
            }
            else
            {
                p2GameOver = false;
            }

            if(p1GameOver && p2GameOver)
            {
                $("#start-game").removeClass("invisible");
                $("#sit-btn").removeClass("invisible");
                startRef.set({start: false});
            }
            else
            {
                $("#start-game").addClass("invisible");
                $("#sit-btn").addClass("invisible");
            }
        }
    });
                    
    seatedRef.on("value", snapshot =>
    {
        if(snapshot.val() !== null)
        {
            $("#seated-div").removeClass("not-seated");
            $("#seated-div").removeClass("seated");

            if(snapshot.val().isSeated)
            {
                $("#seated-div").addClass("seated");
                $("#seated-div").text("Seated");
                $("#sit-btn").text("Stand");
                isSeated = true;
            }
            else
            {
                $("#seated-div").addClass("not-seated");
                $("#seated-div").text("Not Seated");
                $("#sit-btn").text("Sit");
                isSeated = false;
            }
        }
    });

    //Set the RNG seed.
    rngRef.on("value", snapshot =>
    {
        if(snapshot.val() !== null)
        {
            rngSeed = snapshot.val().rngSeed;
        }
    });

    //Check to see if game needs to be started.
    startRef.on("value", snapshot =>
    {
        isMultiPlayer = isSeated;

        if(snapshot.val() !== null)
        {            
            if(snapshot.val().start)
            {
                if(isPlayer1)
                {
                    if(debug)console.log("Player 1 Game Started.");
                    ntEngine1.ntRequest(NTEngine.GR_RESEED, rngSeed);
                    ntEngine1.ntRequest(NTEngine.GR_RESET, startLevel);
                }
                
                if(isMultiPlayer && isPlayer2) 
                {
                    if(debug)console.log("Player 2 Game Started.");
                    ntEngine2.ntRequest(NTEngine.GR_RESEED, rngSeed);
                    ntEngine2.ntRequest(NTEngine.GR_RESET, startLevel);
                }
            }
        }
    });

    //Set the Game Id for both players.
    gameIdRef.on("value", snapshot =>
    {
        if(snapshot.val() !== null)
        {
            gameId = snapshot.val().id;
            if(debug)console.log("Game ID: " + gameId);
        }
    });
}

/******************************************* Top Level *******************************************/

//Force page to reset if back or forward button is used.
window.onunload = () => {};

//Verify the user is logged in.
$.post("/api/users/verify/")
.then(data =>
{
    //If not, boot 'em out!
    if(data.notLoggedIn)
    {
        window.location.href = "/denied";
    }

    //Get the forum data.
    $.get("/api/forums/getforum/" + data.targetForum)
    .then(forumData =>
    {
        if(debug)console.log(forumData);

        //Fill out the initial stats.
        $("#r-player1").text(forumData.owner);
        $("#r-score1").text("0");
        $("#r-lines1").text("0");
        $("#r-level1").text(forumData.startLevel);
        player1 = forumData.owner;

        if(forumData.player2 && forumData.player2 !== "")
        {
            $("#r-player2").text(forumData.player2);
            $("#r-score2").text("0");
            $("#r-lines2").text("0");
            $("#r-level2").text(forumData.startLevel);
            player2 = forumData.player2;
        }

        //Setup the starting level.
        startLevel = forumData.startLevel;
        interference = parseFloat(forumData.interference);
        player1Level = startLevel;
        player2Level = startLevel;

        //Determine the role of the current user.
        if(data.username === forumData.owner)
        {
            isPlayer1 = true;
        }
        else if(data.username === forumData.player2)
        {
            isPlayer2 = true;
        }

        //Setup Firebase
        let apiString = makeString(chars, apiArray);
        firebaseConfig =
        {
            apiKey: apiString,
            authDomain: "not-tetris-f324c.firebaseapp.com",
            databaseURL: "https://not-tetris-f324c.firebaseio.com",
            projectId: "not-tetris-f324c",
            storageBucket: "not-tetris-f324c.appspot.com",
            messagingSenderId: "687760025354",
            appId: "1:687760025354:web:e8555aa185c781cce1fcf3",
            measurementId: "G-J44WC6V21M"
        };

        firebase.initializeApp(firebaseConfig); //Initialize Firebase.
        database = firebase.database();         //Create a variable to reference the database.

        forumsRef = database.ref("forums/");
        forumsRef.orderByChild("forumId").equalTo(data.targetForum).once("value", snapshot =>
        {
            //Create firebase entry for this forum if it does not already exist.
            if(snapshot.val() === null)
            {
                database.ref("forums/").push({forumId: data.targetForum})
                .then(data => 
                {
                    thisForumKey  = data.key;
                    player1Ref    = database.ref("forums/" + thisForumKey + "/player1/");
                    player2Ref    = database.ref("forums/" + thisForumKey + "/player2/");
                    p1GameOverRef = database.ref("forums/" + thisForumKey + "/p1GameOver/");
                    p2GameOverRef = database.ref("forums/" + thisForumKey + "/p2GameOver/");
                    seatedRef     = database.ref("forums/" + thisForumKey + "/isSeated/");
                    rngRef        = database.ref("forums/" + thisForumKey + "/rngSeed/");
                    startRef      = database.ref("forums/" + thisForumKey + "/start/");
                    gameIdRef     = database.ref("forums/" + thisForumKey + "/gameId/");
                    
                    //Add initial data to firebase.
                    player1Ref.set({status: {...initStatus, currentLevel: startLevel, currentScore: 0, linesCleared: 0}});
                    player2Ref.set({status: {...initStatus, currentLevel: startLevel, currentScore: 0, linesCleared: 0}});
                    p1GameOverRef.set({isGameOver: true});
                    p2GameOverRef.set({isGameOver: true});
                    seatedRef.set({isSeated: false});
                    rngRef.set({rngSeed: 0});
                    startRef.set({start: false});
                    addListeners(data);
                });
            }
            else
            {
                //Get the firebase entry for this forum.
                snapshot.forEach(data => thisForumKey = data.key);
                player1Ref    = database.ref("forums/" + thisForumKey + "/player1/");
                player2Ref    = database.ref("forums/" + thisForumKey + "/player2/");
                p1GameOverRef = database.ref("forums/" + thisForumKey + "/p1GameOver/");
                p2GameOverRef = database.ref("forums/" + thisForumKey + "/p2GameOver/");
                seatedRef     = database.ref("forums/" + thisForumKey + "/isSeated/");
                rngRef        = database.ref("forums/" + thisForumKey + "/rngSeed/");
                startRef      = database.ref("forums/" + thisForumKey + "/start/");
                gameIdRef     = database.ref("forums/" + thisForumKey + "/gameId/");

                p1GameOverRef.set({isGameOver: true});
                p2GameOverRef.set({isGameOver: true});
                addListeners(data);
            }
        });

        $(".user-title").text("Hello, " + data.username + "!");
    })
    .fail(err => console.log(err));
})
.fail(err =>
{
    console.log(err);
    window.location.href = "/denied";
});
