import { Router } from "express";
import { getAllchats } from "../controllers/chats.controller.js";
const chatRouter = Router();
chatRouter.get('/', getAllchats);
export default chatRouter;
//# sourceMappingURL=chat-routes.js.map