/* eslint-disable camelcase */
var $submitBtn = $("#post-tool");
var $rentBtn = $(".rent");
var $searchForm = $("#search-form");
var $searchBtn = $("#search");
var $deleteBtn = $(".delete");
//var $toolList = $("#tool-list");

$(document).ready(function() {
  $("select").formSelect();
});
$(document).ready(function() {
  $("#modal-delete").modal();
});
$(document).ready(function() {
  $("#modal-rent").modal();
});
var API = {
  saveTool: function(tool) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/tools",
      data: JSON.stringify(tool)
    }).then(function() {
      // Reload the page to get the updated list
      //location.reload();
      location.replace("/search/" + tool.name);
    });
  },
  getTools: function() {
    return $.ajax({
      url: "api/tools",
      type: "GET"
    });
  },
  getToolsByCategory: function(tools) {
    return $.ajax({
      type: "GET",
      url: "api/tools" + category
    }).then(function() {
      console.log(tools);
    });
  },
  rentTool: function(transaction) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/rent",
      data: JSON.stringify(transaction)
    }).then(function() {
      // Reload the page to get the updated list
      //location.reload();
    });
  },
  searchTool: function(searchTerm) {
    return $.ajax({
      url: "search/" + searchTerm,
      type: "GET"
    }).then(function() {
      console.log(searchTerm);
      location.replace("/search/" + searchTerm);
    });
  },
  deleteTools: function(id) {
    return $.ajax({
      url: "api/tools/" + id,
      type: "DELETE"
    }).then(function() {
      // Reload the page to get the updated list
      //location.reload();
    });
  }
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var $toolName = $("#tool-name");
  var $toolImage = $("#tool-image");
  var $toolDescription = $("#tool-description");
  var $toolCategory = $("#tool-category");
  var $toolPrice = $("#tool-price");

  var tool = {
    name: $toolName.val().trim(),
    image: $toolImage.val().trim(),
    description: $toolDescription.val().trim(),
    category: $toolCategory.val().trim(),
    price: $toolPrice.val().trim(),
    renter: 2,
    rented: false,
    MemberId: 1
  };

  if (!($toolName && $toolDescription)) {
    alert("You must enter a tool name and description!");
    return;
  }

  API.saveTool(tool).then(function() {
    //refreshExamples();
  });

  $toolName.val("");
  $toolImage.val("");
  $toolDescription.val("");
  $toolCategory.val("");
  $toolPrice.val(0);
};

// var renderToolByCategory = function(event) {
//   var
// })

var handleRentSubmit = function(event) {
  event.preventDefault();

  var $rentToolId = $(this)[0].dataset.toolId;
  var $rentOwnerId = $(this)[0].dataset.ownerId;
  var $rentPrice = $(this)[0].dataset.toolPrice;
  var $renterId = localStorage.getItem("email");

  //Check for user email if not add guest email
  if ($renterId === null || $renterId === "") {
    $renterId = "guest@email.com";
  }

  var transaction = {
    tool_id: $rentToolId,
    renter_id: $renterId,
    owner_id: $rentOwnerId,
    price: $rentPrice
  };
  console.log("The transaction" + transaction);

  API.rentTool(transaction).then(function() {
    //refreshExamples();
  });
};

// eslint-disable-next-line no-unused-vars
var triggerSearch = function(event) {
  event.preventDefault();
  // eslint-disable-next-line prettier/prettier
  var text = $("#search").val().trim();

  API.searchTool(text).then(function() {
    //refreshExamples();
  });
};

var handleDeleteSubmit = function(event) {
  event.preventDefault();
  var $deleteToolId = $(this)[0].dataset.toolId;
  console.log("The id " + $deleteToolId);
  API.deleteTools($deleteToolId).then(function() {
    //refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$rentBtn.on("click", handleRentSubmit);
$("#search-form").on("submit", triggerSearch);
$deleteBtn.on("click", handleDeleteSubmit);
