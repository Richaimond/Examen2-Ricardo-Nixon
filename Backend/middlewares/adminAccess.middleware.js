const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AccessLog = require("../models/AccessLog");

const JWT_SECRET = process.env.JWT_SECRET;


const adminAccess = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                error: true,
                message: "Token faltante",
            });
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                error: true,
                message: "Token inválido",
            });
        }

        const userId = decoded.id;
        const route = req.originalUrl;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ error: true, message: "Usuario no encontrado" });
        }

        const isAdmin = user.roles.includes("admin");
        console.log("User desde DB:", user);

        if (!isAdmin) {
            await AccessLog.create({
                userId,
                route,
                success: false,
                reason: "Acceso denegado por rol insuficiente",
                date: new Date()
            });
            return res.status(403).json({
                error: true,
                message: "Acceso denegado por rol insuficiente"
            });
        }

        await AccessLog.create({
            userId,
            route,
            success: true,
            date: new Date()
        });

        req.user = { id: user._id, name: user.name, email: user.email };

        next();

    } catch (error) {
        console.error("Error en adminAccess:", error);
        return res.status(500).json({ error: true, message: "Error interno en el middleware" });
    }
};

module.exports = adminAccess;