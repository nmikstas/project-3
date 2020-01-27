
/**************************************** Resize Listener ****************************************/

window.addEventListener("resize", () => 
{
    $('#pieceCanvas').width($('#pieceCanvas').parent().width());
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



/***************************************** Game Handlers *****************************************/



/*************************************** Button Listeners ****************************************/

$(document).ready(() =>
{
    $(".leave-forum").on("click", () =>
    {
        window.location.href = "/home";
    });
});

/*********************************** Game Engine And Renderer ************************************/

let runForum = (data) =>
{
    
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
    runForum(data);
})
.fail(function(err)
{
    console.log(err);
    window.location.href = "/denied";
});
