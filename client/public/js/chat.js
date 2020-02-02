let player;
let forumId;

let isModerator = false;

let databaseCommentsArr = [];
let commentsArr = [];
let lastComments = 0;

let appendComments = () =>
{
    //console.log("hello");

    $.get("/api/comments/getcomments/" + forumId)
    .then((data) =>
    {
        //console.log(data);

        databaseCommentsArr = [...data];

        //console.log(databaseCommentsArr);
    

        if (commentsArr !== databaseCommentsArr)
        {
            for (let i = lastComments; i < databaseCommentsArr.length; i++)
            {
                commentsArr.push(databaseCommentsArr[i]);
            }
        }

        if (lastComments !== commentsArr.length)
        {
            //console.log(commentsArr);

            for (let i = lastComments; i < commentsArr.length; i++)
            {
                let userName = commentsArr[i].username;
                let userNameSpan = $("<span>");
                userNameSpan.addClass("chat-username");
                userNameSpan.text(userName + ": ");

                let userCommentId = commentsArr[i]._id;
                //console.log(userCommentId);

                let userComment = commentsArr[i].comment;
                let userCommentSpan = $("<span>");
                userCommentSpan.addClass("chat-usertext");
                userCommentSpan.attr("id", userCommentId)
                userCommentSpan.text(userComment);

                let commentDiv = $("<div>");
                commentDiv.addClass("mx-2 text-left");

                commentDiv.append(userNameSpan);
                commentDiv.append(userCommentSpan);

                if (isModerator)
                {
                    let moderateCommentIcon = "X";
                    let moderateCommentBtn = $("<button>");
                    let moderateCommentDiv = $("<span>");
                    moderateCommentDiv.addClass("mr-2");
                    moderateCommentBtn.addClass("deleteCommentBtn");
                    moderateCommentBtn.attr("type", "button");

                    moderateCommentBtn.append(moderateCommentIcon);
                    moderateCommentDiv.append(moderateCommentBtn);
                    commentDiv.prepend(moderateCommentDiv);
                }

                $(".chat-div").append(commentDiv);
            }
        }
    });
    lastComments = commentsArr.length;
}

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

    //Get the forum data.
    $.get("/api/forums/getforum/" + forumId)
    .then(forumData =>
    {
        //console.log(forumData);
        if (player === forumData.owner)
        {
            //console.log("forum owner: " + forumData.owner);
            isModerator = true;
        }

        for (let i = 0; i < forumData.spectators.length; i++)
        {
            if (forumData.spectators[i].username === player)
            {
                isModerator = forumData.spectators[i].isModerator;
            }
        }

        //console.log("player: " + player + ", is moderator: " + isModerator);

        appendComments();
        setInterval(appendComments, 1000);
    });

})
.fail(function(err)
{
    console.log(err);
    window.location.href = "/denied";
});