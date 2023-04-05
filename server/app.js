const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const authRoutes = require("./routes/auth");
const socketRouter = require("./routes/socketRouter")(io);
// const adminRoutes = require("./routes/admin/auth");
// const sessionRoutes = require("./routes/session");
// const tokenRoutes = require("./routes/token");
// const contactRoutes = require("./routes/contact");
// const uploadsRoutes = require("./routes/uploads");

env.config();

mongoose
  .connect(
    `mongodb+srv://bn71:passCODE@cluster0.ey3n0.mongodb.net/whatsapp?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use("/api", authRoutes);
app.use("/api", socketRouter);



io.on("connection", (socket) => {
  console.log(`ID: ${socket.id}`);
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${ process.env.PORT }`);
});