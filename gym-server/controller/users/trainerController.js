const userModel = require("../../models/userModel");

// Get all trainers
const getAllTrainers = async (req, res) => {
    try {
        const trainers = await userModel.find({ role: "trainer" }).select("-password");
        res.json({ success: true, data: trainers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Add new trainer
const addTrainer = async (req, res) => {
    try {
        const { name, email, phone, specialization } = req.body;
        const newTrainer = new userModel({ name, email, phone, specialization, role: "trainer" });
        await newTrainer.save();
        res.status(201).json(newTrainer);
    } catch (error) {
        res.status(500).json({ message: "Failed to add trainer" });
    }
};

// Update trainer
const updateTrainer = async (req, res) => {
    try {
        const { name, email, phone, specialization } = req.body;
        const updatedTrainer = await userModel.findByIdAndUpdate(req.params.id, { name, email, phone, specialization }, { new: true });
        res.json(updatedTrainer);
    } catch (error) {
        res.status(500).json({ message: "Failed to update trainer" });
    }
};

// Delete trainer
const deleteTrainer = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Trainer deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete trainer" });
    }
};

module.exports = { getAllTrainers, addTrainer, updateTrainer, deleteTrainer };