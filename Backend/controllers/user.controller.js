const { request, response } = require("express");
const User = require("../models/User");


const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.find().select("name");
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ error: true, message: "Internal Error" });
    }
};

const getUserById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('name email');
        if (!user) {
            return res.status(404).send({ error: true, message: "User not found" });
        }
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: true, message: "Internal Error" });
    }
};


const createUser = async (req = request, res = response) => {
    try {
        const user = new User(req.body);
        await user.save();
        return res.status(201).send(user);
    } catch (error) {
        return res.status(400).send({ error: true, message: "Invalid data" });
    }
};

const updateUser = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body);
        if (!updatedUser) {
            return res.status(404).send({ error: true, message: "User not found" });
        }
        return res.status(200).send({ message: "User updated successfully" });
    } catch (error) {
        return res.status(500).send({ error: true, message: "Internal Error" });
    }
};

const deleteUser = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send({ error: true, message: "User not found" });
        }
        return res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).send({ error: true, message: "Internal Error" });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
