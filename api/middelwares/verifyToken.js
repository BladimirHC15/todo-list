import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.headers["token"];

    if (token) {
        jwt.verify(token, "secreto", (error, data) => {
            if (error) return res.status(400).json({ mensaje: "El Token es invalido" });
            else {
                req.user = data;
                next();
            }
        });
    } else {
        res.status(400).json({ mensaje: "Debes enviar un token" });
    }
};
