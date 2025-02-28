import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";

import { OpenAIApi } from "openai";
// import { configureOpenAI } from '../config/openai-config.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { processGeminiResponse } from "../config/Process.js";

dotenv.config();


export const generateChatCompletion = async ( req: Request,
  res: Response,
  next: NextFunction) => {
    console.log("object")

    const { message } = req.body;

    console.log("whats app")
    try {
       
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        // grab chats of user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));


        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });



const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

console.log("model ",model)

const result = await model.generateContent(message);

const formattedMessage=processGeminiResponse(result.response.text());


console.log("helloooo",result.response.text());
user.chats.push({ content: formattedMessage, role: "assistant" });
console.log("fomated  ",formattedMessage)
await user.save();

        // // send all chats with new one to openAI API
        // const config = configureOpenAI();
        // const openai = new OpenAIApi(config);
        // // get latest response
        // const chatResponse = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages: chats,
        // });
        // console.log("chat response ", chatResponse);
        // user.chats.push(chatResponse.data.choices[0].message);
        // await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chats.controller.js.map