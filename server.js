import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";

const { MONGO_URL, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful.");
      console.log(`Server running. Use our API on port: ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
