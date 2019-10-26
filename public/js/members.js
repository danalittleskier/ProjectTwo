$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.member.first_name);
    $(".member-last").text(data.member.last_name);
    $(".member-zip").text(data.member.zip);
    $(".member-user").text(data.member.username);
  });
});
