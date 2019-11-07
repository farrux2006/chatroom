$(document).ready(function() {
  const me = localStorage.getItem("user");
  const myUser = me !== null && parseJwt(me);

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
  // const socket = io("http://192.168.1.100:4000");
  const socket = io("http://localhost:4000");
  console.log(socket);

  socket.emit("get-history", {});

  socket.on("send-history", history => {
    history.map(msg => {
      $(".chat-body").append(`
          <div class="${
            myUser.username === msg.author ? "my-chat-card" : "chat-card"
          }">
            <div class="time-ava">
                <p>${msg.author} - ${msg.date.slice(0, 10)}</p>
                <img src="./69306.jpg" alt="simpson" />
            </div>    
                <div class="chat-text">
                    <p>${msg.message}</p>
                </div>
            </div>
        `);
    });
  });

  socket.on("send-all-msg", data => {
    $(".chat-body").append(`
            <div class="${
              myUser.username === data.author ? "my-chat-card" : "chat-card"
            }">
              <div class="time-ava">
                <p>${data.author} - ${data.date.slice(0, 10)}</p>
                <img src="./69306.jpg" alt="simpson" />
              </div>  
                <div class="chat-text">
                    <p>${data.message}</p>
                </div>
            </div>
        `);
  });

  $(".button").on("click", function() {
    const val = $(".input").val();

    socket.emit("send-msg", val);
    $(".input").val("");
  });

  $(".input").on("keypress", function(e) {
    if (e.which == 13) {
      const val = $(".input").val();

      const message = {
        author: parseJwt(me),
        message: val
      };

      socket.emit("send-msg", message);
      $(".input").val("");
    }
  });

  // celebreties

  const btn = document.getElementById("btn");
  const result = document.getElementById("result");

  btn.addEventListener("click", function() {
    fetch("http://localhost:4000/api/who-are-you", {
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

    axios
      .post("/api/register", formData)
      .then(res => {
        $("#logout").show();
        const usr = parseJwt(res.data.user.token);
        localStorage.setItem("user", res.data.user.token);
        window.location.href = "/";
      })
      .catch(err => console.log("err", err.response));
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
