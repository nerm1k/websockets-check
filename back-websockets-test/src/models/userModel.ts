import knex from "knex";

const pool = knex(require("../../knexfile"));

interface User {
    user_id: number;
    username: string;
    email: string;
    color: string;
    createdAt: Date;
}

interface UserWithPassword extends User {
    password: string;
}

export default class UserModel {
    async createUser(username: string, email: string, password: string) {
        const user: User[] = await pool('users')
                                .insert({ username, email, password, color: '#C7C7C7' })
                                .returning(['user_id', 'username', 'email', 'color', 'created_at']);

        return user[0];
    }

    async findUserByAttribute(attribute: string, value: string | number) {
        const user: User = await pool('users')
                        .select('user_id', 'username', 'email', 'color', 'created_at')
                        .where(attribute, '=', value)
                        .first();

        return user;
    }

    async findUserByAttributeWithPassword(attribute: string, value: string | number) {
        const user: UserWithPassword = await pool('users')
                        .select('user_id', 'username', 'email', 'password', 'color', 'created_at')
                        .where(attribute, '=', value)
                        .first();

        return user;
    }

    async updateColorByUserId(userId: string, color: string) {
        await pool('users')
            .where('user_id', '=', userId)
            .update({
                color: color
            });
    }
}