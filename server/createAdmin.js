import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();

async function createAdmin() {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: "admin@studentportal.com",
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    await Admin.create({
      name: "Administrator",
      email: "admin@studentportal.com",
      password: hashedPassword,
      role: "Admin",
    });

    console.log("🎉 Admin created successfully!");
    console.log("Email: admin@studentportal.com");
    console.log("Password: Admin@123");

    process.exit();

  } catch (error) {

    console.error(error);
    process.exit(1);

  }
}

createAdmin();