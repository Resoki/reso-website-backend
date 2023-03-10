const multer = require("multer");
const fs = require('fs');
const upload = multer({ dest: "uploads/" });
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  const oldPath = req.file.path;
  const newPath = req.file.destination + req.file.originalname;
  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;
    res.send("Fichier téléchargé et renommé avec succès");
  });
});
module.exports = router;