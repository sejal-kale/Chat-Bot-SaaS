import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser, } from "../controllers/chats.controller.js";
const chatRouter = Router();
console.log("hichat user");
chatRouter.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRouter.get("/all-chats", verifyToken, sendChatsToUser);
chatRouter.delete("/delete", verifyToken, deleteChats);
export default chatRouter;
//# sourceMappingURL=chat-routes.js.map