let debug = true;
let ntEngine;
let ntRenderer;
let ntInput;
let rngSeed;
let gameId;
let startLevel = 0;
let selectedId = 0;

/**************************************** Resize Listener ****************************************/

window.addEventListener("resize", () => 
{
    $('#pieceCanvas').width($('#pieceCanvas').parent().width());
});

/*************************************** Button Listeners ****************************************/

$(document).ready(() =>
{
    $("#start-btn").on("click", () =>
    {
        rngSeed = Math.floor(Math.random() * 100000000);
        ntEngine.ntRequest(NTEngine.GR_RESEED, rngSeed);
        ntEngine.ntRequest(NTEngine.GR_RESET, startLevel);
        $("#start-btn").addClass("invisible");
        isStarted = true;
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
    
    if(status.gameStatus === NTEngine.GS_OVER)
    {
        $("#start-btn").removeClass("invisible");
    }
}

/*********************************** Game Engine And Renderer ************************************/

let runForum = (data) =>
{
    //Create a new NT game renderer.
    ntRenderer = new NTRender(showStats);

    //Create a new game engine.
    ntEngine = new NTEngine(123456789, renderHandler);

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
    ntRenderer.enableInputCallback = ntInput.enableInputs;

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

    $(".user-title").text("Hello, " + data.username + "!");
    runForum(data);
    
})
.fail(function(err)
{
    console.log(err);
    window.location.href = "/denied";
});
