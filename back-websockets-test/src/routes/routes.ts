import { Router } from "express";
import UserController from "../controllers/userController";
import { authenticateJWT } from "../middlewares/auth";
import GeneralChatController from "../controllers/generalChatController";

export const routes = (userController: UserController, generalChatController: GeneralChatController): Router => {
    const router = Router();

    router.post('/api/v1/register', userController.registerUser);
    router.post('/api/v1/login', userController.loginUser);
    router.get('/api/v1/logout', userController.logoutUser);

    router.put('/api/v1/users/:userId/color', authenticateJWT, userController.updateColorByUserId);

    router.get('/api/v1/messages', generalChatController.getMessages);
    router.post('/api/v1/messages', generalChatController.createMessage);

    return router;
}