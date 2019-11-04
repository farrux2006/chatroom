$(document).ready(function() {
  const me = localStorage.getItem("user");

  if (window.location.pathname === "/chat") {
    if (!me) {
      window.location.href = "/";
    }
  }

  if (me) {
    $("#logout").show();
    const usr = parseJwt(me);
    $(".auth").hide();
    $("#chat-room").show();
  } else {
    $("#logout").hide();
    $(".auth").show();
    $("#chat-room").hide();
  }
  const socket = io("https://farrux.herokuapp.com");

  $(".button").on("click", function() {
    const val = $(".input").val();

    socket.emit("send-msg", val);
    $(".input").val("");
  });

  $(".input").on("keypress", function(e) {
    if (e.which == 13) {
      const val = $(".input").val();

      socket.emit("send-msg", val);
      $(".input").val("");
    }
  });

  socket.on("send-all-msg", data => {
    $(".chat-body").append(`
            <div class="chat-card">
                <img src="./69306.jpg" alt="simpson" />
                <div class="chat-text">
                    <p>${data}</p>
                </div>
            </div>
        `);
  });

  // celebreties

  const btn = document.getElementById("btn");
  const result = document.getElementById("result");

  btn.addEventListener("click", function() {
    fetch("https://farrux.herokuapp.com/api/who-are-you", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        result.innerHTML = `
                
                    <h1>${data.result.name}</h1>

                    <img src="${data.result.photo}" alt="human" />


                `;
      });
  });

  // register
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  const formData = {};
  const formDataLogin = {};

  $(".register-btn").on("click", () => {
    formData.username = $(".username-inp").val();
    formData.email = $(".useremail-inp").val();
    formData.password = $(".userpassword-inp").val();

    axios.post("/api/register", formData).then(res => {
      $("#logout").show();
      const usr = parseJwt(res.data.user.token);
      localStorage.setItem("user", res.data.user.token);
      window.location.href = "/";
    });
  });

  $(".login-btn").on("click", () => {
    formData.email = $(".email-inp").val();
    formData.password = $(".pass-inp").val();

    axios.post("/api/login", formData).then(res => {
      $("#logout").show();
      const usr = parseJwt(res.data.user.token);
      localStorage.setItem("user", res.data.user.token);
      window.location.href = "/";
    });
  });

  $("#logout").on("click", function() {
    localStorage.removeItem("user");
    window.location.href = "/";
  });
});
