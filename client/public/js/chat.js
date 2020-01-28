
$(document).ready(() =>
{

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

    let player = data.username;
    let forumId = data.targetForum

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