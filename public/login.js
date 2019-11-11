// $(document).ready(function() {
//   $(".login-container .input-1 input").click(function() {
//     $(".login-container .input-1 i")
//       .css("color", "#302b92")
//       .css("transform", "translateY(-5px)")
//       .css("transition", "0.2s ease");
//   });
//   $(".login-container .input-1 input").focusout(function() {
//     const username_length = $(".login-container .input-1 input").val();

//     $(".login-container .input-1 i")
//       .css("color", "grey")
//       .css("transform", "translateY(0)")
//       .css("transition", "0.2s ease");

//     if (username_length === "") {
//       $(".login-container .input-1 i").css("color", "red");
//       $(".login-container .input-1 input").css(
//         "border-bottom",
//         "2px solid red"
//       );
//     } else {
//       $(".login-container .input-1 i").css("color", "green");
//       $(".login-container .input-1 input").css(
//         "border-bottom",
//         "2px solid green"
//       );
//     }
//   });

//   $(".login-container .input-2 input").click(function() {
//     $(".login-container .input-2 i")
//       .css("color", "#302b92")
//       .css("transform", "translateY(-5px)")
//       .css("transition", "0.2s ease");
//   });
//   $(".login-container .input-2 input").focusout(function() {
//     const password_length = $(".login-container .input-2 input").val();

//     $(".login-container .input-2 i")
//       .css("color", "grey")
//       .css("transform", "translateY(0)")
//       .css("transition", "0.2s ease");

//     if (password_length === "") {
//       $(".login-container .input-2 i").css("color", "red");
//       $(".login-container .input-2 input").css(
//         "border-bottom",
//         "2px solid red"
//       );
//     } else {
//       $(".login-container .input-2 i").css("color", "green");
//       $(".login-container .input-2 input").css(
//         "border-bottom",
//         "2px solid green"
//       );
//     }
//   });
//   $("#login").click(function() {
//     const username_length = $(".login-container .input-1 input").val();
//     const password_length = $(".login-container .input-2 input").val();

//     if (username_length === "") {
//       alert("giris bas tutmadi zehmet olmasa istifadeci adinizi daxil edin!");
//     }

//     if (password_length === "") {
//       alert("giris bas tutmadi zehmet olmasa sifrenizi daxil edin!");
//     }
//   });

//   let loginData = {};

//   $("#login").click(function() {
//     loginData.username = $("#username").val();
//     loginData.password = $("#password").val();

//     console.log(loginData);
//   });

//   $(".login-container .forgot-pass #forgot").click(function() {
//     toggle = false;

//     if (toggle === false) {
//       $("dialog").removeClass("dialog-close");
//       $("dialog").addClass("dialog-open");
//     }
//   });
//   $("dialog .x, dialog #send").click(function() {
//     toggle = true;

//     if (toggle === true) {
//       $("dialog").removeClass("dialog-open");
//       $("dialog").addClass("dialog-close");
//     }
//   });

//   let forgotData = {};

//   // $("#send").click(function() {
//   //   forgotData.Email = $("#mail").val();

//   //   console.log(forgotData);
//   // });
// });
