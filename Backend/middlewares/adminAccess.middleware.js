const User = require("../models/User");
const AccessLog = require("../models/AccessLog");

const adminAccess = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const route = req.originalUrl;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ error: true, message: "Usuario no encontrado" });
        }

        const isAdmin = user.roles.includes("admin");

        if (!isAdmin) {
            await AccessLog.create({
                userId,
                route,
                success: false,
                reason: "Acceso denegado por rol insuficiente"
            });
            return res.status(403).json({
                error: true,
                message: "Acceso denegado por rol insuficiente"
            });
        }

        // Registrar acceso exitoso
        await AccessLog.create({
            userId,
            route,
            success: true
        });

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Error interno en el middleware" });
    }
};

module.exports = adminAccess;