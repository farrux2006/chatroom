

module.exports = function(io){
    io.on("connection",(socket) => {
        socket.on("send-msg", (val) => {
            console.log(val) 
            
        io.emit("send-all-msg",val)
        })
    })
}