let localLoopback  = true;
let remoteLoopback = false;
let debug          = true;
let init           = false;
let startLevel     = 0;
let rngSeed;
let gameId;

//Player 1
let isPlayer1 = false;
let ntEngine1;
let ntRenderer1;
let ntInput1;

//Player 2
let isPlayer2 = false;
let ntEngine2;
let ntRenderer2;
let ntInput2;

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
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
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

/***************************************** Game Handlers *****************************************/

let inputHandler1 = (request, param) =>
{
    if(ntEngine1.gameStatus === NTEngine.GS_OVER) return;
    if(isPlayer1) ntEngine1.ntRequest(request, param);
}

let inputHandler2 = (request, param) =>
{
    if(ntEngine2.gameStatus === NTEngine.GS_OVER) return;
    if(isPlayer2) ntEngine2.ntRequest(request, param);
}

let renderHandler1 = (status) =>
{
    ntRenderer1.gfRender(status);

    if(localLoopback && isPlayer1)
    {
        ntRenderer2.gfRender(status);
    }

    //**********For local and remote loopback testing**********
    if(status.gameStatus === NTEngine.GS_OVER && !init)
    {
        $("#p1-btn").removeClass("invisible");
    }

    init = false;
}

let renderHandler2 = (status) =>
{
    ntRenderer2.gfRender(status);

    if(localLoopback && isPlayer2)
    {
        ntRenderer1.gfRender(status);
    }

    //**********For local and remote loopback testing**********
    if(status.gameStatus === NTEngine.GS_OVER && !init)
    {
        $("#p2-btn").removeClass("invisible");
    }

    init = false;
}

//**********For local and remote loopback testing**********
startGame1 = () =>
{
    init = true;
    rngSeed = Math.floor(Math.random() * 100000000);
    ntEngine1.ntRequest(NTEngine.GR_RESEED, rngSeed);
    ntEngine1.ntRequest(NTEngine.GR_RESET, startLevel);
}

//**********For local and remote loopback testing**********
startGame2 = () =>
{
    init = true;
    rngSeed = Math.floor(Math.random() * 100000000);
    ntEngine2.ntRequest(NTEngine.GR_RESEED, rngSeed);
    ntEngine2.ntRequest(NTEngine.GR_RESET, startLevel);
}

/*************************************** Button Listeners ****************************************/

$(document).ready(() =>
{
    resizeCanvases();
    $(".leave-forum").on("click", () => window.location.href = "/home");
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

        ntEngine1 = new NTEngine(123456789, renderHandler1);

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

    //Call the createScene function.
    let scene1 = ntRenderer1.gfCreateScene(engine1, canvas1);

    //Register a Babylon render loop to repeatedly render the scene.
    engine1.runRenderLoop(function () { scene1.render(); });

    //Watch for browser/canvas resize events.
    window.addEventListener("resize", function () { engine1.resize(); });

    //----------------- Next Piece ------------------
    //Get canvas to render the next piece on.
    let npCanvas1 = document.getElementById("pieceCanvas1");

    //Create a new babylon engine.
    let npEngine1 = new BABYLON.Engine(npCanvas1, true);

    //Call the createScene function.
    let npScene1 = ntRenderer1.npCreateScene(npEngine1);

    //Register a Babylon render loop to repeatedly render the scene.
    npEngine1.runRenderLoop(function () { npScene1.render(); });

    //Watch for browser/canvas resize events.
    window.addEventListener("resize", function () { npEngine1.resize(); });

    //------------------ Player 2 -------------------
    //Create a new game engine if player 2 is local.
    if(isPlayer2)
    {
        //Create a new NT game renderer.
        ntRenderer2 = new NTRender(showStats2, isPlayer2);

        //Create a new game engine.
        ntEngine2 = new NTEngine(123456789, renderHandler2);

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

    //Call the createScene function.
    let scene2 = ntRenderer2.gfCreateScene(engine2, canvas2);

    //Register a Babylon render loop to repeatedly render the scene.
    engine2.runRenderLoop(function () { scene2.render(); });

    //Watch for browser/canvas resize events.
    window.addEventListener("resize", function () { engine2.resize(); });

    //----------------- Next Piece ------------------
    //Get canvas to render the next piece on.
    let npCanvas2 = document.getElementById("pieceCanvas2");

    //Create a new babylon engine.
    let npEngine2 = new BABYLON.Engine(npCanvas2, true);

    //Call the createScene function.
    let npScene2 = ntRenderer2.npCreateScene(npEngine2);

    //Register a Babylon render loop to repeatedly render the scene.
    npEngine2.runRenderLoop(function () { npScene2.render(); });

    //Watch for browser/canvas resize events.
    window.addEventListener("resize", function () { npEngine2.resize(); });
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

        if(forumData.player2 && forumData.player2 !== "")
        {
            $("#r-player2").text(forumData.player2);
            $("#r-score2").text("0");
            $("#r-lines2").text("0");
            $("#r-level2").text(forumData.startLevel);
        }

        //Setup the starting level.
        startLevel = forumData.startLevel;

        //Determine the role of the current user.
        if(data.username === forumData.owner)
        {
            isPlayer1 = true;
        }
        else if(data.username === forumData.player2)
        {
            isPlayer2 = true;
        }

        //**********For local and remote loopback testing**********
        if(isPlayer1 && (remoteLoopback || localLoopback))
        {
            $("#p1-div").html("<button class=\"btn btn-outline-success\" id=\"p1-btn\">Start Game</button>");
            $("#p1-btn").on("click", () =>
            {
                $("#p1-btn").addClass("invisible");
                setTimeout(startGame1, 1000);
            });
        }
        else if(isPlayer2  && (remoteLoopback || localLoopback))
        {
            $("#p2-div").html("<button class=\"btn btn-outline-success\" id=\"p2-btn\">Start Game</button>");
            $("#p2-btn").on("click", () =>
            {
                $("#p2-btn").addClass("invisible");
                setTimeout(startGame2, 1000);
            });
        }

        $(".user-title").text("Hello, " + data.username + "!");
        runForum(data);
    })
    .fail(err => console.log(err));
})
.fail(err =>
{
    console.log(err);
    window.location.href = "/denied";
});
