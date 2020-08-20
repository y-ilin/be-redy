$(document).ready(() => {
  // Event listener listening for enter on the input field, then will run newComment.
  $(".commentInput").on("keypress", event => {
    if (event.keyCode === 13) {
      newComment(event.currentTarget);
    }
  });
  function newComment(textData) {
    const data = {
      commentText: textData.value,
      StickyNoteId: textData.id
    };
    $.ajax({
      method: "POST",
      url: "/api/comments",
      data: data
    }).then(() => {
      location.reload();
      console.log(data);
    });
  }

  // Delete function, get comment by its id and deletes it through the route
  $(".commentDelete").on("click", event => {
    deleteComment(event.currentTarget);
  });
  function deleteComment(textData) {
    const id = textData.parentElement.id;
    $.ajax({
      method: "DELETE",
      url: "/api/comments/" + id
    }).then(() => {
      location.reload();
    });
  }

  function countComments() {
    const commentCount = $(".commentCount");
    for (let i = 0; i < commentCount.length; i++) {
      if (parseInt(commentCount[i].innerText) > 0) {
        commentCount[i].setAttribute("style", "opacity: 1");
      }
    }
  }
  countComments();

  function countStars() {
    const voteCount = $(".voteCount");
    console.log(voteCount);
    for (let i = 0; i < voteCount.length; i++) {
      console.log(voteCount[i].innerText);
      if (parseInt(voteCount[i].innerText) > 0) {
        voteCount[i].setAttribute("style", "opacity: 1");
        console.log(voteCount[i]);
      }
    }
  }
  countStars();
});
