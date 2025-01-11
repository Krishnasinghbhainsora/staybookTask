const Task = require("../models/Task");
const User = require("../models/User");

// Create 
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title, owner: req.user._id });
    await task.save();
    res.status(201).send({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).send({ message: "Error creating task", error: error.message });
  }
};

// Get all 
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [{ owner: req.user._id }, { sharedWith: req.user._id }],
    }).populate("owner", "name email");

    res.send(tasks);
  } catch (error) {
    res.status(500).send({ message: "Error fetching tasks", error: error.message });
  }
};

// Share 
exports.shareTask = async (req, res) => {
  try {
    const { email } = req.body;
    const userToShareWith = await User.findOne({ email });

    if (!userToShareWith) return res.status(404).send({ message: "User not found" });

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send({ message: "Task not found" });

    if (!task.sharedWith.includes(userToShareWith._id)) {
      task.sharedWith.push(userToShareWith._id);
      await task.save();
    }

    res.send({ message: "Task shared successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error sharing task", error: error.message });
  }
};

// Update 
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id.trim();

    // Fetch task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    if (!task.owner.equals(req.user._id)) {
      return res.status(403).send({ message: "You are not authorized to update this task" });
    }

    // Update title and status
    task.title = req.body.title || task.title;
    task.status = req.body.status || task.status;

    await task.save();

    res.send({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).send({ message: "Error updating task", error: error.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).send({ message: "Task not found" });

    if (!task.owner.equals(req.user._id)) {
      return res.status(403).send({ message: "You are not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.send({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting task", error: error.message });
  }
};


  