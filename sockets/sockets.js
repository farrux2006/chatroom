const Chat = require("../models/chatModel");

module.exports = function(io) {
  io.on("connection", socket => {
    socket.on("send-msg", data => {
      const chatMessage = new Chat({
        message: data.message,
        author: data.author.username,
        date: new Date()
      });
      chatMessage.save().then(() => {
        io.emit("send-all-msg", {
          ...data,
          author: data.author.username,
          date: new Date()
        });
      });
    });

    // clean chat

    socket.on("get-history", async () => {
      let chatHistory = await Chat.find({});

      socket.emit("send-history", chatHistory);
    });
  });
};
