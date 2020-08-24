$(document).ready(() => {
  // Event listener listening for a click on any vote button, then will run voteSticky
  $(document).on("click", ".voteButton", voteSticky);

  // Function to send POST request to server to log sticky vote
  async function voteSticky(event) {
    try {
      // Stop propagation so the click event affects the vote button and nothing below it
      event.stopPropagation();
      // Selecting the vote button that was clicked
      const voteButtonClicked = event.currentTarget;
      // Selecting the star image of the button
      const voteButtonImg = $(voteButtonClicked).find("img");

      // Determine if the user is trying to vote or unvote, based on whether the star is full or empty at this point.
      const voteFor = voteButtonImg.hasClass("voteStarEmpty");

      // Getting the stickyId of the sticky clicked on
      const sticky = voteButtonClicked.closest(".draggable");
      const stickyId = $(sticky).attr("id");

      // POST request sent with the stickyId and userId in order to log this vote
      $.post("/api/vote", { stickyId, voteFor }, data => {
        // Find the star vote counter for this sticky
        const stickyStar = $(sticky).find(".voteCount");

        // Render the vote count onto the star, and set opacity according to whether the count is at least 1 or not.
        stickyStar.html(data.stickyVoteCount);
        if (data.stickyVoteCount > 0) {
          $(stickyStar).attr("style", "opacity: 1");
        } else {
          $(stickyStar).attr("style", "opacity: 0");
        }
      }).then(data => {
        if (voteFor) {
          // If the user is adding a vote, replace the empty star with a filled-in star on the DOM by changing its image source
          $(voteButtonImg).attr("src", "/assets/img/filled-star.svg");
          // Changing the vote star to have class of ".voteStar" instead of ".voteStarEmpty"
          $(voteButtonImg).removeClass("voteStarEmpty");
          $(voteButtonImg).addClass("voteStar");
          console.log(
            `User ${data.userEmail} has voted for sticky #${data.stickyId}`
          );
        } else {
          // Else if the user is removing a vote, do the opposite
          $(voteButtonImg).attr("src", "/assets/img/star.svg");
          $(voteButtonImg).removeClass("voteStar");
          $(voteButtonImg).addClass("voteStarEmpty");
          console.log(
            `User ${data.userEmail} has unvoted for sticky #${data.stickyId}`
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
});
