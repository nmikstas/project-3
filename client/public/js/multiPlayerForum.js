let debug = true;
let init = false;
let ntEngine1;
let ntRenderer1;
let ntInput1;
let rngSeed;
let gameId;
let startLevel = 0;
let selectedId = 0;
let player1;
let score1;

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

/***************************************** Game Handlers *****************************************/

let inputHandler1 = (request, param) =>
{
    if(ntEngine1.gameStatus === NTEngine.GS_OVER) return;
    ntEngine1.ntRequest(request, param);
}

let renderHandler1 = (status) =>
{
    ntRenderer1.gfRender(status);
}


/*************************************** Button Listeners ****************************************/

$(document).ready(() =>
{
    resizeCanvases();

    $(".leave-forum").on("click", () =>
    {
        window.location.href = "/home";
    });

    ntEngine1.ntRequest(NTEngine.GR_RESET, 0);
});

/*********************************** Game Engine And Renderer ************************************/

let runForum = (data) =>
{
    //------------------ Player 1 -------------------
    //Create a new NT game renderer.
    ntRenderer1 = new NTRender(showStats1);

    //Create a new game engine.
    ntEngine1 = new NTEngine(123456789, renderHandler1);

    //Used to hide play piece during animations.
    ntRenderer1.getField = () => { return ntEngine1.ntGetGameField(); }

    //Input control module.
    ntInput1 = new NTInput
    (
        inputHandler1,
        { 
            /*
            leftBtn:    data.player1.leftBtn,
            leftIndex:  data.player1.leftIndex,
            leftType:   data.player1.leftType,
            rightBtn:   data.player1.rightBtn,
            rightIndex: data.player1.rightIndex,
            rightType:  data.player1.rightType,
            downBtn:    data.player1.downBtn,
            downIndex:  data.player1.downIndex,
            downType:   data.player1.downType,
            cwBtn:      data.player1.flipCWBtn,
            cwIndex:    data.player1.flipCWIndex,
            cwType:     data.player1.flipCWType,
            ccwBtn:     data.player1.flipCCWBtn,
            ccwIndex:   data.player1.flipCCWIndex,
            ccwType:    data.player1.flipCCWType,
            pauseBtn:   data.player1.pauseBtn,
            pauseIndex: data.player1.pauseIndex,
            pauseType:  data.player1.pauseType
            */
        }
    );

    //Allows inputs to be disabled during animations.
    ntRenderer1.enableInputCallback = ntInput1.enableInputs;

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
        //window.location.href = "/denied";
    }

    player1 = data.username;
    highScore1 = data.highScore;
    $(".user-title").text("Hello, " + data.username + "!");
    runForum(data);
})
.fail(function(err)
{
    console.log(err);
    //window.location.href = "/denied";
});
