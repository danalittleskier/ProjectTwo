$(document).ready(function() {
  // Getting references to our form and input
  var adminUpForm = $("form.adminLog");
  var emailInput = $("input#admin-email-input");
  var passwordInput = $("input#admin-password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  adminUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    console.log(userData.email, userData.password);

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpAdmin(userData.email, userData.password);

    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  // eslint-disable-next-line no-unused-vars
  function signUpAdmin(email, password) {
    $.post("/api/admin", {
      email: email,
      password: password
    })
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        console.log("This worked!");
        window.location.replace("/adminhome");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(function(err) {
        console.log("error!");
        console.log(err);
      });
  }
});
