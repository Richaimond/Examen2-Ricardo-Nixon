const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const  verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: true,
            message: "Acceso denegado. Formato de token incorrecto."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            message: "Token inválido."
        });
    }
};

module.exports = verifyToken;
