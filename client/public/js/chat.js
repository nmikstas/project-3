let player;
let forumId;

let isModerator = false;

let databaseCommentsArr = [];
let commentsArr = [];
let lastComments = 0;
let isAutoScrolling = true;

let chatAutoScroll = () =>
{
    $(".chat-div").stop().animate(
    {
        scrollTop: $(".chat-div")[0].scrollHeight
    }, 800);
}

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

        for (let i = 0; i < commentsArr.length; i++)
        {
            //console.log(commentsArr[i].isDeleted);

            let userCommentId = commentsArr[i]._id;

            if (commentsArr[i].isDeleted !== databaseCommentsArr[i].isDeleted)
            {
                commentsArr[i].isDeleted = databaseCommentsArr[i].isDeleted;

                lastComments = 0;
                $(".chat-div").empty();
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

                let userComment;
                let userCommentSpan = $("<span>");

                if (commentsArr[i].isDeleted)
                {
                    userComment = "This message has been moderated.";
                    userCommentSpan.addClass("chat-usertext-moderated");
                    userCommentSpan.attr("id", userCommentId)
                    userCommentSpan.text(userComment);
                }
                else
                {
                    userComment = commentsArr[i].comment;
                    userCommentSpan.addClass("chat-usertext");
                    userCommentSpan.attr("id", userCommentId)
                    userCommentSpan.text(userComment);
                }

                let commentDiv = $("<div>");
                commentDiv.addClass("comment-div mx-2 text-left");

                commentDiv.append(userNameSpan);
                commentDiv.append(userCommentSpan);

                if (isModerator)
                {
                    if (commentsArr[i].isDeleted)
                    {
                        let moderateCommentIcon = "&plus;";
                        let moderateCommentBtn = $("<button>");
                        let moderateCommentDiv = $("<span>");
                        moderateCommentDiv.addClass("mr-2");
                        moderateCommentBtn.addClass("restoreCommentBtn");
                        moderateCommentBtn.attr("type", "button");
                        
                        moderateCommentBtn.on("click", function (event)
                        {
                            //console.log("undelete");

                            $.ajax("/api/comments/undeletecomment",
                            {
                                type: "PUT",
                                data:
                                {
                                    id: userCommentId,
                                }
                            })
                            .fail(function(err)
                            {
                                console.log(err);
                                window.location.href = "/denied";
                            });
                        });

                        moderateCommentBtn.append(moderateCommentIcon);
                        moderateCommentDiv.append(moderateCommentBtn);

                        commentDiv.prepend(moderateCommentDiv);
                    }
                    else
                    {
                        let moderateCommentIcon = "X";
                        let moderateCommentBtn = $("<button>");
                        let moderateCommentDiv = $("<span>");
                        moderateCommentDiv.addClass("mr-2");
                        moderateCommentBtn.addClass("deleteCommentBtn");
                        moderateCommentBtn.attr("type", "button");

                        moderateCommentBtn.on("click", function (event)
                        {
                            //console.log("delete");

                            $.ajax("/api/comments/deletecomment",
                            {
                                type: "PUT",
                                data:
                                {
                                    id: userCommentId,
                                }
                            })
                            .fail(function(err)
                            {
                                console.log(err);
                                window.location.href = "/denied";
                            });
                        });

                        moderateCommentBtn.append(moderateCommentIcon);
                        moderateCommentDiv.append(moderateCommentBtn);

                        commentDiv.prepend(moderateCommentDiv);
                    }
                }

                $(".chat-div").append(commentDiv);

                if(isAutoScrolling)
                {
                    chatAutoScroll();
                }
            }
        }
    });
    lastComments = commentsArr.length;
}

$(document).ready(() =>
{
    let chatBtn = () =>
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
    }

    let disableAutoScroll = () =>
    {
        $(".scroll-btn").on("click", function (event)
        {
            if (isAutoScrolling)
            {
                isAutoScrolling = false;
                $(".scroll-btn").text("Enable Auto-Scroll");
            }
            else
            {
                isAutoScrolling = true;
                $(".scroll-btn").text("Disable Auto-Scroll");
            }
        });
    }

    chatBtn();
    disableAutoScroll();
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