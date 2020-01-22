let ntEngine;
let ntRenderer;
let ntInput;

/*************************************** Button Listeners ****************************************/

$(document).ready(function()
{
    $("#start-btn").on("click", function()
    {
        ntEngine.ntRequest(NTEngine.GR_RESET, 0);
        isStarted = true;
    });
});

/************************************** Disable Key Scrolling **************************************/

window.addEventListener("keydown", function(e)
{
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
    {
        e.preventDefault();
    }
}, false);

/************************************** Game Stats Callback **************************************/

let showStats = (level, score, lines, gameStatus, request) =>
{
    //Append all the stats.
    $("#h-score").text("Score: " + score);
    $("#h-level").text("Level: " + level);
    $("#h-lines").text("Lines: " + lines);

    //Show last request status.
    switch(request)
    {
        case NTEngine.LRS_NONE:
            $("#h-request").text("Last Request: None");
            break;

        case NTEngine.LRS_ACCEPT:
            $("#h-request").text("Last Request: Accepted");
            break;

        default:
            $("#h-request").text("Last Request: Rejected");
            break;
    }

    //Show game status
    switch(gameStatus)
    {
        case NTEngine.GS_OVER:
            $("#h-status").text("Game Status: Game Over");
            break;

        case NTEngine.GS_PLAY:
            $("#h-status").text("Game Status: Playing");
            break;

        case NTEngine.GS_PAUSE:
            $("#h-status").text("Game Status: Paused");
            break;

        default:
            $("#h-status").text("Game Status: Animation Wait");
            break;
    }
}

/*********************************** Game Engine And Renderer ************************************/

let runForum = (data) =>
{
    //Create a new NT game renderer.
    ntRenderer = new NTRender(showStats);

    //Create a new game engine.
    ntEngine = new NTEngine(255000255, ntRenderer.gfRender);

    //Used to hide play piece during animations.
    ntRenderer.getField = () => { return ntEngine.ntGetGameField(); }

    //Input control module.
    ntInput = new NTInput
    (
        ntEngine.ntRequest,
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
