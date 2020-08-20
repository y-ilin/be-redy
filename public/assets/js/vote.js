$(document).ready(() => {
  // Event listener listening for a click on any vote button, then will run voteSticky
  $(document).on("click", ".voteButton", voteSticky);

  // Function to send POST request to server to log sticky vote
  async function voteSticky(event) {
    try {
      // Stop propagation so the click event affects the vote button and nothing below it
      event.stopPropagation();

      // Getting the stickyId of the sticky clicked on
      const sticky = event.currentTarget.closest(".draggable");
      const stickyId = $(sticky).attr("id");

      // Send post request to server with the stickyId and userId in order to log this vote
      $.post("/api/vote", { stickyId }, data => {
        // Find the star vote counter for this sticky
        const stickyStar = $(sticky).find(".voteCount");
        // Render the vote count onto the star
        stickyStar.html(data.stickyVoteCount);

        console.log(
          `User ${data.userEmail} has voted for sticky #${data.stickyId}`
        );
      }).then(() => {
        // Replace the empty star with a filled-in star on the DOM
        // Selecting the vote button that was clicked
        const voteButtonClicked = event.currentTarget;
        const voteButtonImg = $(voteButtonClicked).find("img");

        // Setting its image source to the filled-in star svg
        $(voteButtonImg).attr("src", "/assets/img/filled-star.svg");
        // Changing the vote star to have class of ".voteStar" instead of ".voteStarEmpty"
        $(voteButtonImg).removeClass("voteStarEmpty");
        $(voteButtonImg).addClass("voteStar");
      });
    } catch (error) {
      console.log(error);
    }
  }
});
