const express = require("express");
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");
const adminAccess = require("../middlewares/adminAccess.middleware");


const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", adminAccess, createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
