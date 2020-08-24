$(document).ready(() => {
  let dragged = false;
  let textEdit = false;
  let allData = {};

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  // Click event for new note.
  $(document).on("click", "#pink,#orange,#yellow", newNote);

  // Sets colour button id for newNote POST.
  $(".newStickyNoteButton").on("click", event => {
    dataC = event.currentTarget.id;
  });

  // Function to add note to db and reload page.
  function newNote() {
    const sticky = {
      noteText: "Add text here",
      xCoord: 80,
      yCoord: 80,
      noteColour: dataC
    };

    // POST request to create a sticky
    $.ajax({
      method: "POST",
      url: "/api/notes",
      data: sticky
    }).then(() => {
      location.reload();
    });
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
        dragged = true;
        sendTextData(event.currentTarget);
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
  }
  //////////////// End of InteractJS library code ////////////////

  // Event listener listening for a click on any delete button, then will run deleteSticky
  $(document).on("click", ".deleteButton", deleteSticky);

  function deleteSticky(event) {
    event.stopPropagation();
    const closestSticky = $(this).closest(".draggable")[0];
    const id = $(closestSticky).attr("id");
    console.log("sticky id is " + id);

    // DELETE request to delete sticky
    $.ajax({
      method: "DELETE",
      url: "/api/notes/" + id
    }).then(() => {
      location.reload();
    });
  }

  $(".textInput").on("click", () => {
    textEdit = true;
  });

  $(".thisMoves").on("mouseleave", event => {
    event.stopPropagation();
    if (textEdit === true) {
      sendTextData(event.currentTarget);
    }
  });

  // UPDATING the text and coordinates of the sticky note.
  function sendTextData(element) {
    if (dragged === true) {
      allData = {
        id: element.id,
        xCoord: element.dataset.x,
        yCoord: element.dataset.y
      };
    }
    if (textEdit === true) {
      allData = {
        noteText: element.children[3].innerHTML,
        id: element.id
      };
    }

    // PUT request to update sticky
    $.ajax({
      method: "PUT",
      url: "/api/notes",
      data: allData
    }).then(() => {
      dragged = false;
      textEdit = false;
    });
  }
});
