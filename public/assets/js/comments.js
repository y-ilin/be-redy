$(document).on("click", ".newComment", newComment);

// GET request to figure out which user is logged on
function getUserData() {
  return $.get("api/user_data");
}

//Function to send POST request to server to log sticky comment
async function newComment(event) {
  try {
    // Getting the stickyId of the sticky clicked on
    const sticky = event.currentTarget.closest(".draggable");
    const stickyId = $(sticky).attr("id");

    // Getting the userId of the logged in user
    const userData = await getUserData();
    const userId = userData.id;

    // Send post request to server with the stickyId and userId in order to log this
    $.post("api/vote", { stickyId, userId }, data => {
      console.log(
        `User ${data.userEmail} has commented on sticky #${data.stickyId}`
      );
    }).then(data => {
      // Find the comment count for this sticky
      const stickyComment = $(sticky).find(".commentCount");
      // Render the comment count onto the comment
      stickyComment.html(data.stickyCommentCount);
    });
  } catch (error) {
    console.log(error);
  }
}
