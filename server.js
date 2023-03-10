const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const myMiddleware = require("./middleware");
const likesRoutes = require("./routes/likeRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

router.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.put("/add/like", likesRoutes);
app.get("/checking/like/:postId/:userId", likesRoutes);
app.post("/register", userRoutes);
app.post("/login", userRoutes);
app.get("/users/:letter", userRoutes);
app.get("/profile/:id", userRoutes);
app.put("/profile/:id", userRoutes);

app.post("/add/post", postRoutes);
app.put("/add/post", postRoutes);
app.get("/all/posts", postRoutes);

app.post("/upload", uploadRoutes);

//import image directory
app.use(express.static("uploads"));
app.use(myMiddleware);
// Exemple de middleware pour logger les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Endpoint de test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).send("Sorry, we can't find that!");
});

// Middleware pour gérer les erreurs 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const mongoose = require("mongoose");
app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://Resoki:Ballon32%2F@cluster0.nsmmcu2.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error", err));
  console.log(`Example app listening at http://localhost:${port}`);
});
