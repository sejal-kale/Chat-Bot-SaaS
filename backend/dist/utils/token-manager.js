import jwt from "jsonwebtoken";
export const createToken = (id, email) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};
//# sourceMappingURL=token-manager.js.map