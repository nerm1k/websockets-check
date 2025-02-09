import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import { isValidEmail, isValidPassword, isValidUsername } from "../utils/validations";

dotenv.config();

export default class UserService {
    userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async registerUser(username: string, email: string, password: string) {
        if (!isValidUsername(username) || !isValidEmail(email) || !isValidPassword(password)) {
            return null;
        }

        const isUsernameExists = await this.userModel.findUserByAttribute('username', username);
        const isEmailExists = await this.userModel.findUserByAttribute('email', email);
        if (isUsernameExists || isEmailExists) {
            return null;
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await this.userModel.createUser(username, email, hashedPassword);

        return user;
    }

    async loginUser(username: string, password: string) {
        if (!isValidUsername(username) || !isValidPassword(password)) {
            return null;
        }

        const user = await this.userModel.findUserByAttributeWithPassword('username', username);
        if (!user) {
            return null;
        }

        const isSameUser = await bcrypt.compare(password, user.password);
        if (!(user && isSameUser)) {
            return 401;
        }

        const jwtToken = jwt.sign({id: user.user_id, username: user.username, email: user.email, color: user.color}, process.env.JWT_SECRET || 'secret', {expiresIn: '1h'});
        return {user, jwtToken};
    }

    async updateColorByUserId(userId: string, color: string) {
        const isUserExists = await this.userModel.findUserByAttribute('user_id', userId);
        if (!isUserExists) {
            return false;
        }

        await this.userModel.updateColorByUserId(userId, color);
        return true;
    }
} 