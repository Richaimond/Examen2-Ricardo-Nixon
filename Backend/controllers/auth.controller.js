const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: true, message: "Email ya registrado." });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({ name, email, password: hashedPassword, roles });
        await user.save();

        return res.status(201).json({ message: "Usuario registrado correctamente." });

    } catch (error) {
        return res.status(500).json({ error: true, message: "Error interno." });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: true, msg: "usuario no existe" });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: true, msg: "credenciales invalidos" });
        }
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
            },
            JWT_SECRET,
            { expiresIn: "2h" }
        );
        return res.status(200).json({
            message: "Welcome to the App",
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: "Internal Error" });
    }
}

module.exports = { registerUser, login };