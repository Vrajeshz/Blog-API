const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.listen(8080, () => {
  console.log(`App running on Port 8080`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!!! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close((err) => {
    process.exit(1);
  });
});
