let debug = true;
let init  = false;
let is2d  = false;
let ntEngine;
let ntRenderer;
let ntInput;
let rngSeed;
let gameId;
let startLevel = 0;
let selectedId = 0;
let player;
let score;
let highScore;

/**************************************** Resize Listener ****************************************/

window.addEventListener("resize", () => 
{
    $('#pieceCanvas').width($('#pieceCanvas').parent().width());
    if(is2d)ntRenderer.resize();
});

/************************************** Disable Key Scrolling **************************************/

window.addEventListener("keydown", (e) =>
{
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
    {
        e.preventDefault();
    }
}, false);

/************************************** Game Stats Callback **************************************/

let showStats = (level, score, lines) =>
{
    //Append all the stats.
    $("#r-score").text(score);
    $("#r-level").text(level);
    $("#r-lines").text(lines);
}

/***************************************** Game Handlers *****************************************/

let inputHandler = (request, param) =>
{
    if(ntEngine.gameStatus === NTEngine.GS_OVER) return;
    ntEngine.ntRequest(request, param);
}

let renderHandler = (status) =>
{
    ntRenderer.gfRender(status);
    
    if(status.gameStatus === NTEngine.GS_OVER && !init)
    {
        $("#start-btn").removeClass("invisible");
    }

    init = false;

    if(status.currentScore > score)
    {
        score = status.currentScore;

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
            window.location.href = "/denied";
        });

        if(status.currentScore > highScore)
        {
            highScore = status.currentScore;

            //Modify the user data.
            $.ajax("/api/users/update",
            {
                type: "PUT",
                data:
                { 
                    username:  player,
                    highScore: highScore,
                    level:     status.currentLevel,
                    lines:     status.linesCleared
                }
            })
            .then((data) =>
            {
                if(debug)console.log(data);
            })
            .fail(function(err)
            {
                console.log(err);
                window.location.href = "/denied";
            });
        }
    }
}

startGame = () =>
{
    rngSeed = Math.floor(Math.random() * 100000000);

    let game =
    {
        player1: player,
        level1:  startLevel,
        rngSeed: rngSeed
    };

    $.post("/api/games/create", game)
    .then((data) =>
    {
        gameId = data._id;
        ntEngine.ntRequest(NTEngine.GR_RESEED, rngSeed);
        ntEngine.ntRequest(NTEngine.GR_RESET, startLevel);

        //Reset all the game variables for the database.
        isStarted = true;
        score = 0;
    })
    .fail(function(err)
    {
        console.log(err);
        window.location.href = "/denied";
    });
}

/*************************************** Button Listeners ****************************************/

$(document).ready(() =>
{
    $("#start-btn").on("click", () =>
    {
        init = true;
        $("#start-btn").addClass("invisible");
        setTimeout(startGame, 1000);
    });

    $(".leave-forum").on("click", () =>
    {
        window.location.href = "/home";
    });

    $(".img-container").on("click", function()
    {
        startLevel = $(this).attr("id");
        $("#" + selectedId).removeClass("selected-img-container");
        $("#" + selectedId).addClass("notSelected-img-container");
        selectedId = $(this).attr("id");
        $(this).removeClass("notSelected-img-container");
        $(this).addClass("selected-img-container");
    });
});

/*********************************** Game Engine And Renderer ************************************/

let runForum = (data) =>
{
    //Create a new NT game renderer.
    if(is2d)
    {
        ntRenderer = new NTRender2d(showStats, $("#gf-div"), $("#piece-div"));
    }
    else
    {
        ntRenderer = new NTRender(showStats);
    }
    
    //Create a new game engine.
    ntEngine = new NTEngine(123456789, renderHandler);

    //Tie the renderer to the game engine.
    ntRenderer.ntEngine = ntEngine;

    //Used to hide play piece during animations.
    ntRenderer.getField = () => { return ntEngine.ntGetGameField(); }

    //Input control module.
    ntInput = new NTInput
    (
        inputHandler,
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
    ntRenderer.enableInputCallback = (en) => {ntInput.enableInputs(en)};

    if(!is2d)
    {
        //----------------- Game Field ------------------
        //Get canvas to render the game field on.
        let canvas = document.getElementById("renderCanvas");

        //Create a new babylon engine.
        let engine = new BABYLON.Engine(canvas, true);

        //Call the createScene function.
        let scene = ntRenderer.gfCreateScene(engine, canvas);

        //Register a Babylon render loop to repeatedly render the scene.
        engine.runRenderLoop(function () { scene.render(); });

        //Watch for browser/canvas resize events.
        window.addEventListener("resize", function () { engine.resize(); });

        //----------------- Next Piece ------------------
        //Get canvas to render the next piece on.
        let npCanvas = document.getElementById("pieceCanvas");

        //Create a new babylon engine.
        let npEngine = new BABYLON.Engine(npCanvas, true);

        //Call the createScene function.
        let npScene = ntRenderer.npCreateScene(npEngine);

        //Register a Babylon render loop to repeatedly render the scene.
        npEngine.runRenderLoop(function () { npScene.render(); });

        //Watch for browser/canvas resize events.
        window.addEventListener("resize", function () { npEngine.resize(); });
    }
}

/******************************************* Top Level *******************************************/

//Force page to reset if back or forward button is used.
window.onunload = () => {};

//Verify the user is logged in.
$.post("/api/users/verify/")
.then((data) =>
{
    //If not, boot 'em out!
    if(data.notLoggedIn)
    {
        window.location.href = "/denied";
    }

    player = data.username;
    highScore = data.highScore;
    $(".user-title").text("Hello, " + data.username + "!");

    if(data.render && data.render == "2D")
    {
        is2d = true;
    }
    else
    {
        is2d = false;
    }

    runForum(data);
})
.fail(function(err)
{
    console.log(err);
    window.location.href = "/denied";
});
