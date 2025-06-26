const express = require("express");
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");

const verifyToken = require("../middlewares/verifyToken");
const adminAccess = require("../middlewares/adminAccess");

const router = express.Router();

router.get("/", verifyToken, adminAccess, getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
