import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constant.js";
export const getAllUsers = async (req, res, next) => {
    try {
        //get all users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        // user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("User Already register..!");
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // clearing cokkie if he login again
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: '/'
        });
        // store cookie
        // creating token
        const token = createToken(user._id.toString(), user.email);
        // create expiry date
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        // set the cookie
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        // user Login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // usernot exist
        if (!user) {
            return res.status(401).send("User Not Register..!");
        }
        // comparing password 
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            // forbidden req
            return res.status(403).send("Incorret credeintial..!");
        }
        // clearing cokkie if he login again
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: '/'
        });
        // creating token
        const token = createToken(user._id.toString(), user.email);
        // create expiry date
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        // set the cookie
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map