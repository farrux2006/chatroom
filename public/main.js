$(document).ready(function() {

    const socket = io("https://farrux.herokuapp.com")

    $('.button').on("click", function() {

        const val = $('.input').val();
        
        socket.emit("send-msg", val);
        $('.input').val("")


    })

    $('.input').on('keypress',function(e) {

        if(e.which == 13) {
            const val = $('.input').val();
        
            socket.emit("send-msg", val);
            $('.input').val("")
        }

    });

    socket.on("send-all-msg", data => {
        $('.chat-body').append(`
            <div class="chat-card">
                <img src="./69306.jpg" alt="simpson" />
                <div class="chat-text">
                    <p>${data}</p>
                </div>
            </div>
        `);
    })

})