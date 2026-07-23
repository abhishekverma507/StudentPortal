import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import studentRoutes from "./routes/studentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";

dotenv.config();


const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// Routes

app.use(
  "/api/students",
  studentRoutes
);


app.use(
  "/api/dashboard",
  dashboardRoutes
);


app.use(
  "/api/teachers",
  teacherRoutes
);

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees", feeRoutes);


// Test API

app.get("/", (req,res)=>{

  res.send(
    "Student Portal API Running"
  );

});



// Port

const PORT = process.env.PORT || 5000;



// Database + Server Start

connectDB()

.then(()=>{

  app.listen(
    PORT,
    ()=>{

      console.log(
        `🚀 Server running on port ${PORT}`
      );

    }
  );


})


.catch((error)=>{

  console.error(
    "❌ Server startup failed:",
    error.message
  );

});