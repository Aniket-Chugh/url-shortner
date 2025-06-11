import express from "express";
import cors from "cors";
import router from "./src/routes/short_url.route.js";
import Redirectrouter from "./src/routes/redirect_url.route.js";
import { errorHandler } from "./src/utils/error_handling.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/", (req, res) => {
  res.send("The backend is up!");
});

app.use("/api/create", router);


app.use("/" , Redirectrouter );
app.use(errorHandler)

app.listen(3001, () => {
  console.log("Server is running on port 3000");
})
