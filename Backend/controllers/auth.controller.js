const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AccessLock = require("../models/AccessLock");
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: true, message: "Email ya registrado." });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({ name, email, password: hashedPassword });
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
            return res.status(400).json({ error: true, msg: "Usuario no existe." });
        }

        // Verificar si el mae está bloqueado
        if (user.lockUntil && user.lockUntil > Date.now()) {
            const segundosRestantes = Math.ceil((user.lockUntil - Date.now()) / 1000);
            return res.status(403).json({
                error: true,
                msg: `Cuenta bloqueadda Intente de nuevo en ${segundosRestantes} segundos.`
            });
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            user.failedAttempts += 1;

            if (user.failedAttempts > 3) {
                user.lockUntil = Date.now() + 300000; // Bloqueo de los 5 minutos (esto está en ms)
                user.failedAttempts = 0;
                await user.save();

                return res.status(403).json({
                    error: true,
                    msg: "Demasiados intentos fallidos,  bloquiao por 5 minutos."
                });
            }

            await user.save();
            return res.status(400).json({ error: true, msg: "Contraseña inválida" });
        }

        user.failedAttempts = 0;
        user.lockUntil = null;
        await user.save();

        const token = jwt.sign(
            { id: user._id, name: user.name },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: "Error interno del servidor." });
    }
};

module.exports = { registerUser, login };





















