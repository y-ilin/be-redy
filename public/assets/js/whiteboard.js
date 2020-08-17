$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  // Click event for new note.
  $(document).on("click", "#new-post", newNote);

  // Function to add note to db and reload page.
  function newNote(stickyNote) {
    $.post("/api/notes", () => {
      return stickyNote;
    }).then(location.reload());
  }

  /////////////// Start of InteractJS library code ///////////////

  // target elements with the "draggable" class
  interact(".draggable").draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end(event) {
        console.log(event);
      }
    }
  });

  function dragMoveListener(event) {
    const target = event.target;

    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";

    // update the position attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;

    //////////////// End of InteractJS library code ////////////////
  }
  // Event listener listening for a click on any delete button, then will run deleteSticky
  $(document).on("click", ".deleteButton", deleteSticky);

  function deleteSticky(event) {
    event.stopPropagation();
    const closestSticky = $(this).closest(".draggable")[0];
    const id = $(closestSticky).attr("id");
    console.log("sticky id is " + id);

    $.ajax({
      method: "DELETE",
      url: "/api/notes/" + id
    }).then(() => {
      console.log("sticky deleted");
      location.reload();
    });
  }
  $(".thisMoves").on("mouseleave", event => {
    sendTextData(event.currentTarget);
  });

  function sendTextData(element) {
    const allData = {
      noteText: element.children[1].innerHTML,
      id: element.id,
      xCoord: element.dataset.x,
      yCoord: element.dataset.y
    };
    $.ajax({
      method: "PUT",
      url: "/api/notes",
      data: allData
    }).then(() => {
      location.reload();
    });
  }
});
