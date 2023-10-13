import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { registerUser } from "../repositories/users.js";
import UserModel from "../models/user.js";

const { ObjectId } = mongoose.Types;

export const register = async (req, res) => {
  const params = req.body;
  try {
    const username = await UserModel.findOne({ username: params.username });
    if (username) {
      return res.status(401).send({
        message: "An account with the same username already exist.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(params.password, 10);
      const payload = {
        firstName: params.firstName,
        lastName: params.lastName,
        middleName: params.middleName !== undefined ? params.middleName : "",
        username: params.username,
        email: params.email,
        password: hashedPassword,
      };

      await registerUser(payload);
      res.status(200).send({ message: "Success" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error", err: error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (!user)
      return res
        .status(400)
        .send({ message: "Incorrect Username or Password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(400)
        .send({ message: "Incorrect Username or Password" });
    const payload = {
      id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 86400 },
      (err, token) => {
        if (err) {
          return res.send({ message: err });
        }

        res.status(200).send({ message: "Success", token: "Bearer " + token });
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Error", err: error });
  }
};
