import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userAPI from "./routes/users/index.js";
import dotenv from "dotenv"
dotenv.config();

// Setup
const app = express();
const port = process.env.PORT;
const dbURI = process.env.ATLAS_URI;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(cors({
  origin: "https://trash-monitoring.vercel.app"
}));
app.use(express.json());

// APIs
app.use(userAPI);

// Wildcard for APIs that are not existing throws here
app.get("*", function (req, res) {
  res.status(404).send({ message: "URI does not exist" });
});
app.post("*", function (req, res) {
  res.status(404).send({ message: "URI does not exist" });
});
app.put("*", function (req, res) {
  res.status(404).send({ message: "URI does not exist" });
});
app.delete("*", function (req, res) {
  res.status(404).send({ message: "URI does not exist" });
});

// Setup MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(dbURI);

app.listen(port, () => console.log("Listening at port:", port));
