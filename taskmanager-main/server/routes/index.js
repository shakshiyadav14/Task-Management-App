import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

// ✅ Add this to check if API is working
router.get("/", (req, res) => {
  res.send("API is running...");
});

router.use("/user", userRoutes); // API endpoint: /api/user/login
router.use("/task", taskRoutes); // API endpoint: /api/task

export default router;
