// MODULES IMPORT
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Database } from "./config/database.js";

// ROUTERS
import { ALLIANCEROUTER } from "./routers/allianceRouter.js";
import { BLOGROUTER } from "./routers/blogRouter.js";
import { EVENTROUTER } from "./routers/eventRouter.js";
import { CSRROUTER } from "./routers/csrRouter.js";
import { COMMITTEEROUTER } from "./routers/committeeRouter.js";
import { COREMEMBERROUTER } from "./routers/coreMemberRouter.js";
import { HEADSROUTER } from "./routers/headsRouter.js";
import { ALUMNIROUTER } from "./routers/alumniRouter.js";
import { PREVIOUSEVENTROUTER } from "./routers/previousEventRouter.js";
import { HACKATHONPSROUTER } from "./routers/hackathonPSRouter.js";
import { MAILROUTER } from "./routers/mailRouter.js";

// CONFIG
dotenv.config();

// CONSTANTS
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// INTIALIZING EXPRESS
const app = express();

// DATABASE
const database = new Database(MONGODB_URI);
database.connect();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve static files from the 'images' directory
app.use("/api/images", express.static("public/images"));

// TEST ROUTE
app.use("/api/test", (req, res) => {
  res.send("Server is running ✅");
});

//ROUTES
app.use("/api/alliance", ALLIANCEROUTER);
app.use("/api/blog", BLOGROUTER);
app.use("/api/event", EVENTROUTER);
app.use("/api/csr", CSRROUTER);
app.use("/api/committee", COMMITTEEROUTER);
app.use("/api/coremember", COREMEMBERROUTER);
app.use("/api/head", HEADSROUTER);
app.use("/api/alumni", ALUMNIROUTER);
app.use("/api/previousevent", PREVIOUSEVENTROUTER);
app.use("/api/hackathon/ps", HACKATHONPSROUTER);
app.use("/api/sendmail", MAILROUTER);

// DATABASE DISCONNECTION
process.on("SIGINT", () => {
  database
    .disconnect()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});

// LISTEN
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
