import dns from "dns";

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("Mongo URI:");
console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    process.exit();
  })
  .catch((err) => {
    console.log("❌ Connection Failed");
    console.log(err);
    process.exit(1);
  });