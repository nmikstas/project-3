let player;
let forumId;

$(document).ready(() =>
{
    $("#chat-btn").on("click", function (event)
    {
        event.preventDefault();
        let userComment = $("#chat-input").val().trim();
        $("#chat-input").val("");

        let commentObject =
        {
            username: player,
            comment: userComment,
            forumId: forumId,
        };

        $.post("/api/comments/newcomment", commentObject)
        .fail(function(err)
        {
            console.log(err);
            window.location.href = "/denied";
        });
    });
});

//Verify the user is logged in.
$.post("/api/users/verify/")
.then((data) =>
{
    //If not, boot 'em out!
    if(data.notLoggedIn)
    {
        //window.location.href = "/denied";
    }

    player = data.username;
    forumId = data.targetForum;

    $.get("/api/comments/getcomments/" + forumId)
    .then((data) =>
    {
        console.log(data);
    });
})
.fail(function(err)
{
    console.log(err);
    window.location.href = "/denied";
});