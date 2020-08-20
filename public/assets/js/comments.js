$(document).ready(() => {
  // Event listener listening for a click on any vote button, then will run newComment
  $(".commentInput").on("keypress", event => {
    if (event.key === 13) {
      newComment();
    }
  });

  // Function to send POST request to server to log sticky comment
  async function newComment(event) {
    try {
      // Getting the stickyId of the sticky clicked on
      const sticky = event.currentTarget.closest(".draggable");
      const stickyId = $(sticky).attr("id");
      const commentText = $(".commentInput").val();

      // Send post request to server with the stickyId and userId in order to log this comment
      $.post("/api/comments", { stickyId, userId, commentText }, data => {
        // Find the comment counter for this sticky
        const stickyComment = $(sticky).find(".commentStack");
        // Render the comment count onto the comment
        stickyComment.html(data.stickyCommentStack);

        console.log(
          `User ${data.userEmail} has commented on sticky #${data.stickyId}`
        );
      }).then(() => {
        // Reload the page to run through handlebars again in order to render the comment all the time with the count and not just on hover
        location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  }
});
