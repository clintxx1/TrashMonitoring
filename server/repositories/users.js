import UserModel from "../models/user.js"

export const registerUser = async (payload) => {
    const data = new UserModel(payload);
    return await data.save();
}