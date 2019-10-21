/* eslint-disable camelcase */
var $toolName = $("#tool-name");
var $toolDescription = $("#tool-description");
var $toolCategory = $("#tool-category");
var $toolPrice = $("#tool-price");
var $submitBtn = $("#post-tool");

var $rentBtn = $("#rent");
//var $toolList = $("#tool-list");

$(document).ready(function() {
  $("select").formSelect();
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
      location.reload();
    });
  },
  getTools: function() {
    return $.ajax({
      url: "api/tools",
      type: "GET"
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
    });
  },
  deleteTools: function(id) {
    return $.ajax({
      url: "api/tools/" + id,
      type: "DELETE"
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  }
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var tool = {
    name: $toolName.val().trim(),
    description: $toolDescription.val().trim(),
    category: $toolCategory.val().trim(),
    price: $toolPrice.val().trim(),
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
  $toolDescription.val("");
  $toolCategory.val("");
  $toolPrice.val(0);
};

var handleRentSubmit = function(event) {
  event.preventDefault();

  var $rentToolId = $(this)[0].dataset.toolId;
  var $rentOwnerId = $(this)[0].dataset.ownerId;
  var $rentPrice = $(this)[0].dataset.toolPrice;

  var transaction = {
    tool_id: $rentToolId,
    renter_id: 2,
    owner_id: $rentOwnerId,
    price: $rentPrice
  };
  console.log(transaction);

  API.rentTool(transaction).then(function() {
    //refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$rentBtn.on("click", handleRentSubmit);
