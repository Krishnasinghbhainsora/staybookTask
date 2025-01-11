const express = require("express");
const { protect } = require("../middleware/auth");
const { 
  createTask, 
  getTasks, 
  shareTask, 
  updateTask, 
  deleteTask 
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks); 
router.post("/:id/share", protect, shareTask); 
router.put("/:id", protect, updateTask); 
router.delete("/:id", protect, deleteTask); 

module.exports = router;
