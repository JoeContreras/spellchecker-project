import express from "express";
import { PORT } from "./config.js";
import spellRoute from "./routes/SpellCheck.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/spell", spellRoute);

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
