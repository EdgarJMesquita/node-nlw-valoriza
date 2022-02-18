import "reflect-metadata";
import express from "express";
import "./database";
const app = express();

app.post("/car/:id", (req, res) => {
  res.send(req.params.id);
});

app.listen(3000);
