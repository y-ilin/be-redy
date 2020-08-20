$(document).ready(() => {
  // Event listener listening for a click on any vote button, then will run newComment
  $(".commentInput").on("keypress", event => {
    if (event.keyCode === 13) {
      newComment(event.currentTarget);
    }
  });
  function newComment(textData) {
    console.log(textData.id);
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
});
